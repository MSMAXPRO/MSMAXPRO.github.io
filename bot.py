# Yeh zaroori libraries hain
import logging
import os
import google.generativeai as genai
from datetime import date
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# --- YAHAN APNI TELEGRAM ID DAALO ---
# Yeh ID aapko @userinfobot se milegi
ADMIN_ID = 1584806105 
# ------------------------------------

# --- SECRET KEYS (Yeh Railway se aayengi) ---
TELEGRAM_TOKEN = os.environ.get('TELEGRAM_TOKEN')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
# ------------------------------------

# User tracking ke liye ek simple dictionary
daily_users = {}

# Google AI (Gemini) ko configure karna
try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    # Agar keys set nahi hain, to bot shuru nahi hoga
    logging.error(f"Error configuring Google AI: {e}. Make sure API keys are set in Railway.")
    exit()

# Logging set up karna
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Har user ko track karne ke liye function
def track_user(user_id: int):
    today = date.today()
    if today not in daily_users:
        daily_users[today] = set()
    daily_users[today].add(user_id)
    logging.info(f"Today's unique users: {len(daily_users[today])}")


# --- COMMAND FUNCTIONS ---

# /start command ke liye
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    user_name = update.effective_user.first_name
    welcome_message = (
        f"Hello {user_name}! Main aapka AI dost hoon.\n\n"
        "Coding, career, ya padhai se juda koi sawaal hai to pooch sakte ho!\n\n"
        "Please use this bot responsibly. Use /help to see all available commands."
    )
    await update.message.reply_text(welcome_message)

# /help command ke liye
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    help_text = (
        "Here are the available commands:\n\n"
        "/start - To start or restart the bot\n"
        "/help - Shows this list of commands\n"
        "/website - Visit our official website\n"
        "/roadmaps - Get a link to all career roadmaps\n"
        "/blog - Get a link to our blog posts\n"
        "/dsa - Get a random DSA practice problem\n"
        "/connect - Connect with the developer\n"
        "/idea - Get a new project idea\n"
        "/explain [concept] - Ask the AI to explain a concept\n"
        "/clear - Information on how to clear chat\n"
        "/feedback [message] - Send your feedback"
    )
    await update.message.reply_text(help_text)

# /website command ke liye
async def website(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    website_url = "https://codewithmsmaxpro.me"
    reply_text = "Click the button below to visit our official website for detailed roadmaps, blog posts, and more resources!"
    keyboard = [[InlineKeyboardButton("Visit Website", url=website_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(reply_text, reply_markup=reply_markup)

# /roadmaps command ke liye
async def roadmaps(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    roadmaps_url = "https://codewithmsmaxpro.me/roadmaps.html"
    reply_text = "Click the button below to explore all the career roadmaps and choose your path!"
    keyboard = [[InlineKeyboardButton("View Roadmaps", url=roadmaps_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(reply_text, reply_markup=reply_markup)

# /blog command ke liye
async def blog(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    blog_url = "https://codewithmsmaxpro.me/blog.html"
    reply_text = "Click the button below to read our latest blog posts and tutorials."
    keyboard = [[InlineKeyboardButton("Read Blog", url=blog_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(reply_text, reply_markup=reply_markup)

# /dsa command ke liye
async def dsa(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    await update.message.reply_text("Finding a good DSA problem for you...")
    try:
        prompt = "Give me a beginner-friendly DSA (Data Structures and Algorithms) practice problem. State the problem clearly, provide a hint, but do not provide the solution."
        response = model.generate_content(prompt)
        await update.message.reply_text(response.text)
    except Exception as e:
        await update.message.reply_text("Sorry, I couldn't find a problem right now. Please try again later.")
        
# /connect command ke liye
async def connect(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    github_url = "https://github.com/MSMAXPRO"
    linkedin_url = "https://linkedin.com/in/your-linkedin-username" # <-- Isko apne asli LinkedIn URL se badalna
    reply_text = "You can connect with me on these platforms. I'd love to hear from you!"
    keyboard = [
        [InlineKeyboardButton("GitHub", url=github_url)],
        [InlineKeyboardButton("LinkedIn", url=linkedin_url)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(reply_text, reply_markup=reply_markup)

# /idea command ke liye
async def idea(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    await update.message.reply_text("Thinking of a new idea for you...")
    try:
        prompt = "Give me a simple but interesting project idea for a beginner programmer. Explain it in 2-3 lines."
        response = model.generate_content(prompt)
        await update.message.reply_text(response.text)
    except Exception as e:
        await update.message.reply_text("Sorry, I couldn't think of an idea right now. Please try again later.")

# /explain command ke liye
async def explain(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    if not context.args:
        await update.message.reply_text("Please provide a concept to explain. Example: /explain Python lists")
        return
    
    concept = ' '.join(context.args)
    await update.message.reply_text(f"Thinking... Let me explain '{concept}' for you.")
    try:
        prompt = f"Explain the concept of '{concept}' in a simple and easy-to-understand way for a beginner student."
        response = model.generate_content(prompt)
        await update.message.reply_text(response.text)
    except Exception as e:
        await update.message.reply_text(f"Sorry, I couldn't explain '{concept}' right now. Please try again later.")

# /clear command ke liye
async def clear_chat(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    info_text = "For your privacy, a Telegram bot cannot clear your chat history.\n\nTo clear the chat, please tap the three dots (⋮) at the top right of this chat and select 'Clear history'."
    await update.message.reply_text(info_text)

# /feedback command ke liye
async def feedback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    if not context.args:
        await update.message.reply_text("Please write your feedback after the command. Example: /feedback This is a great bot!")
        return
    
    feedback_message = ' '.join(context.args)
    user_name = update.effective_user.username or update.effective_user.first_name
    logging.info(f"FEEDBACK Received from {user_name}: {feedback_message}")
    await update.message.reply_text("Thank you for your feedback! It has been sent to the developer.")

# ADMIN ONLY: /stats command ke liye
async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.effective_user.id == ADMIN_ID:
        today = date.today()
        user_count = len(daily_users.get(today, set()))
        await update.message.reply_text(f"📊 Today's unique active users: {user_count}")
    # Agar admin nahi hai, to bot kuch bhi nahi karega

# Normal text message ke liye
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    track_user(update.effective_user.id)
    user_message = update.message.text
    try:
        response = model.generate_content(user_message)
        await update.message.reply_text(response.text)
    except Exception as e:
        logging.error(f"AI se jawab laane mein error aaya: {e}")
        await update.message.reply_text("Sorry, I'm having some trouble right now. Please try again in a moment.")

# Bot ka main function
def main() -> None:
    application = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Saare commands ko add karna
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("website", website))
    application.add_handler(CommandHandler("roadmaps", roadmaps))
    application.add_handler(CommandHandler("blog", blog))
    application.add_handler(CommandHandler("dsa", dsa))
    application.add_handler(CommandHandler("connect", connect))
    application.add_handler(CommandHandler("idea", idea))
    application.add_handler(CommandHandler("explain", explain))
    application.add_handler(CommandHandler("clear", clear_chat))
    application.add_handler(CommandHandler("feedback", feedback))
    application.add_handler(CommandHandler("stats", stats)) # Admin command
    
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logging.info("Bot ne kaam karna shuru kar diya hai...")
    application.run_polling()

if __name__ == '__main__':
    main()
