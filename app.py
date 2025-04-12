from flask import Flask, render_template, url_for, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

app = Flask(__name__)

# connection to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["CustomerDB"]

@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")

@app.route("/box1")
def about1():
    return render_template("about1.html")

@app.route("/box2")
def about2():
    return render_template("about2.html")

@app.route("/box3")
def about3():
    return render_template("about3.html")

@app.route("/box4")
def about4():
    return render_template("about4.html")

@app.route("/add_user", methods=['POST'])
def add_user():
    try:
        user_data = request.json
        db["users"].insert_one(user_data)  # Добавление документа в коллекцию "users"
        return jsonify({"message": "User added successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_users", methods=['GET'])
def get_users():
    users = list(db["users"].find({}, {"_id": 0}))  # Получение всех пользователей
    return jsonify(users)

@app.route("/user/<string:name>/<int:id>")
def user(name, id):
    return f"User page: {name} - {id}"

@app.route("/update_user/<string:email>", methods=['PUT'])
def update_user(email):
    new_data = request.json
    db["users"].update_one({"email": email}, {"$set": new_data})
    return jsonify({"message": "User updated successfully!"})


@app.route("/delete_user/<string:user_id>", methods=['DELETE'])
def delete_user(user_id):
    db["users"].delete_one({"_id": user_id})
    return jsonify({"message": "User deleted successfully!"})

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        # Проверка данных в базе данных
        user = db["users"].find_one({"email": email, "password": password})
        if user:
            return jsonify({"message": "Login successful!"})
        else:
            return jsonify({"message": "Invalid credentials!"}), 401
    return render_template("login.html")


if __name__ == "__main__":
    app.run(debug=True)