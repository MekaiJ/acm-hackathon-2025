from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS # Import Flask-CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# --- CORS Configuration ---
# This will allow all origins for all routes.
# For production, you might want to restrict origins: CORS(app, resources={r"/*": {"origins": "http://your-frontend-domain.com"}})
CORS(app)
# If you want to be more specific for the /leaderboard route:
# CORS(app, resources={r"/leaderboard": {"origins": "*"}})

socketio = SocketIO(app, cors_allowed_origins="*") # This handles CORS for Socket.IO connections

# Dummy data for testing - you had this from a previous step
leaderboard = {}

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.get_json()
    username = data.get('username')
    currency = data.get('currency', 0)
    if not username:
        return jsonify({'error': 'Username required'}), 400
    leaderboard[username] = leaderboard.get(username, 0) + currency
    # Emit the updated leaderboard to all connected clients
    # Ensure the data emitted is the full leaderboard, sorted if desired by clients
    # or sort it here before emitting if all clients need the same view.
    # For simplicity, emitting the raw leaderboard dict. Client already sorts.
    socketio.emit('leaderboard_update', leaderboard, broadcast=True)
    return jsonify({'success': True, 'leaderboard': leaderboard})

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    # Sort the leaderboard by score in descending order before sending
    sorted_leaderboard = dict(sorted(leaderboard.items(), key=lambda item: item[1], reverse=True))
    return jsonify(sorted_leaderboard)

if __name__ == '__main__':
    # It's good practice to use eventlet or gevent for Socket.IO
    # For example: socketio.run(app, host='0.0.0.0', port=5000, use_reloader=True, debug=True)
    # Ensure you have eventlet installed: pip install eventlet
    socketio.run(app, host='0.0.0.0', port=5000)
