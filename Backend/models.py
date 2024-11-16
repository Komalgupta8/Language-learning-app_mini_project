from config import connect_db
db = connect_db()

# Users collection
users_collection = db['users']

# Lessons collection
lessons_collection = db['lessons']

# Leaderboard collection
leaderboard_collection = db['leaderboard']

# Discussions collection
discussions_collection = db['discussions']
