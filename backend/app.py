import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from api.models import db
from api.routes import api, jwt, bcrypt

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///test.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret")

    db.init_app(app)
    Migrate(app, db)
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:5173"]}},
        supports_credentials=False,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )
    bcrypt.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(api, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"}), 200

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
    
