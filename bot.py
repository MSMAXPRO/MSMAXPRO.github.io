# --- Required Libraries ---
import logging
import os
import google.generativeai as genai
from datetime import date
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# --- Configuration Loaded Securely from Environment Variables ---

# Secrets for APIs, loaded from your hosting environment (e.g., Azure App Service settings)
TELEGRAM_TOKEN = os.environ.get('TELEGRAM_TOKEN')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

# Admin User ID, also loaded from environment for flexibility and security
try:
    # os.environ.get() returns a string, so we must convert it to an integer for comparison
    ADMIN_ID = int(os.environ.get('ADMIN_ID'))
except (ValueError, TypeError):
    logging.warning("ADMIN_ID environment variable not found or is not a valid number. Admin commands will be disabled.")
    ADMIN_ID = None # Disable admin commands if the ID is not set

# --- End of Configuration ---


# --- Bot Setup ---

# User tracking dictionary
daily_users = {}

# Configure Google AI (Gemini)
# This will fail gracefully if keys are not set, and the bot won't start.
if not TELEGRAM_TOKEN or not GEMINI_API_KEY:
    logging.critical("CRITICAL ERROR: TELEGRAM_TOKEN or GEMINI_API_KEY environment variables not set. Bot cannot start.")
    exit()

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    logging.error(f"Error configuring Google AI: {e}. Check if the API key is valid.")
    exit()

# Set up logging to monitor the bot's activity
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# --- Helper Functions ---

def track_user(user_id: int):
    """Tracks unique daily active users."""
    today = date.today()
    if today not in daily_users:
        daily_users[today] = set()
    daily_users[today].add(user_id)
    logging.info(f"Today's unique users: {len(daily_users[today])}")


# --- Command Handlers ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a welcome message when the /start command is issued."""
    track_user(update.effective_user.id)
    user_name = update.effective_user.first_name
    welcome_message = (
        f"Hello {user_name}! Main aapka AI dost hoon.\n\n"
        "Coding, career, ya padhai se juda koi sawaal hai to pooch sakte ho!\n\n"
        "Please use this bot responsibly. Use /help to see all available commands."
    )
    await update.message.reply_text(welcome_message)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a list of available commands."""
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

async def website(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a button to the main website."""
    track_user(update.effective_user.id)
    website_url = "https://codewithmsmaxpro.me"
    keyboard = [[InlineKeyboardButton("Visit Website", url=website_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Click the button below to visit our official website!", reply_markup=reply_markup)

async def roadmaps(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a button to the roadmaps page."""
    track_user(update.effective_user.id)
    roadmaps_url = "https://codewithmsmaxpro.me/roadmaps.html"
    keyboard = [[InlineKeyboardButton("View Roadmaps", url=roadmaps_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Click the button below to explore all the career roadmaps!", reply_markup=reply_markup)

async def blog(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a button to the blog page."""
    track_user(update.effective_user.id)
    blog_url = "https://codewithmsmaxpro.me/blog.html"
    keyboard = [[InlineKeyboardButton("Read Blog", url=blog_url)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Click the button below to read our latest blog posts.", reply_markup=reply_markup)

async def dsa(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Fetches a DSA problem from the AI."""
    track_user(update.effective_user.id)
    await update.message.reply_text("Finding a good DSA problem for you...")
    try:
        prompt = "Give me a beginner-friendly DSA (Data Structures and Algorithms) practice problem. State the problem clearly, provide a hint, but do not provide the solution."
        response = model.generate_content(prompt)
        await update.message.reply_text(response.text)
    except Exception as e:
        logging.error(f"Error fetching DSA problem: {e}")
        await update.message.reply_text("Sorry, I couldn't find a problem right now. Please try again later.")
        
async def connect(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends social media links."""
    track_user(update.effective_user.id)
    github_url = "https://github.com/MSMAXPRO"
    linkedin_url = "https://linkedin.com/in/your-linkedin-username" # <-- IMPORTANT: Update this URL
    keyboard = [
        [InlineKeyboardButton("GitHub", url=github_url)],
        [InlineKeyboardButton("LinkedIn", url=linkedin_url)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("You can connect with me on these platforms:", reply_markup=reply_markup)

async def idea(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Fetches a project idea from the AI."""
    track_user(update.effective_user.id)
    await update.message.reply_text("Thinking of a new idea for you...")
    try:
        prompt = "Give me a simple but interesting project idea for a beginner programmer. Explain it in 2-3 lines."
        response = model.generate_content(prompt)
        await update.message.reply_text(response.text)
    except Exception as e:
        logging.error(f"Error fetching project idea: {e}")
        await update.message.reply_text("Sorry, I couldn't think of an idea right now. Please try again later.")

async def explain(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Explains a concept using the AI."""
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
        logging.error(f"Error explaining concept '{concept}': {e}")
        await update.message.reply_text(f"Sorry, I couldn't explain '{concept}' right now. Please try again later.")

async def clear_chat(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Informs the user on how to clear chat history."""
    track_user(update.effective_user.id)
    info_text = "For your privacy, a Telegram bot cannot clear your chat history.\n\nTo clear the chat, please tap the three dots (⋮) at the top right of this chat and select 'Clear history'."
    await update.message.reply_text(info_text)

async def feedback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Receives feedback from a user."""
    track_user(update.effective_user.id)
    if not context.args:
        await update.message.reply_text("Please write your feedback after the command. Example: /feedback This is a great bot!")
        return
    
    feedback_message = ' '.join(context.args)
    user_name = update.effective_user.username or update.effective_user.first_name
    logging.info(f"FEEDBACK Received from {user_name}: {feedback_message}")
    await update.message.reply_text("Thank you for your feedback! It has been sent to the developer.")

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Admin-only command to get daily user stats."""
    # Check if ADMIN_ID is configured and if the user is the admin
    if ADMIN_ID and update.effective_user.id == ADMIN_ID:
        today = date.today()
        user_count = len(daily_users.get(today, set()))
        await update.message.reply_text(f"📊 Today's unique active users: {user_count}")
    else:
        logging.warning(f"Unauthorized access attempt for /stats command by user {update.effective_user.id}")
        # Optionally, you can send a message back, but it's often better to just ignore it.
        # await update.message.reply_text("You are not authorized to use this command.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handles general text messages by sending them to the AI."""
    track_user(update.effective_user.id)
    user_message = update.message.text
    try:
        response = model.generate_content(user_message)
        await update.message.reply_text(response.text)
    except Exception as e:
        logging.error(f"Error getting AI response: {e}")
        await update.message.reply_text("Sorry, I'm having some trouble right now. Please try again in a moment.")

# --- Main Bot Function ---

def main() -> None:
    """Starts the bot."""
    application = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Register all command handlers
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
    
    # Register a handler for all non-command text messages
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logging.info("Bot is starting...")
    # Start polling for updates
    application.run_polling()

if __name__ == '__main__':
    main()
