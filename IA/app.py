from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/emotion', methods=['GET'])
def emotion():
    # Ceci est un exemple de réponse, à remplacer par l'analyse réelle
    return jsonify({"emotion": "neutre"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
