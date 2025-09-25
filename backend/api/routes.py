from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from datetime import timedelta

api = Blueprint("api", __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

@api.post("/signup")
def signup():
    body = request.get_json() or {}
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, password_hash=pw_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

@api.post("/login")
def login():
    body = request.get_json() or {}
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Bad email or password"}), 401
    token = create_access_token(identity=user.id, expires_delta=timedelta(hours=12))
    return jsonify({"access_token": token, "user": user.serialize()}), 200

@api.get("/private")
@jwt_required()
def private_area():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"message": "Welcome to the private area", "user": user.serialize()}), 200
