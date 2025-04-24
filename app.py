from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """Render the home page."""
    return render_template('index.html')

@app.route('/about')
def about():
    """Render the about page."""
    return render_template('about.html')

@app.route('/skills')
def skills():
    """Render the skills page."""
    return render_template('skills.html')

@app.route('/education')
def education():
    """Render the education page."""
    return render_template('education.html')

@app.route('/experience')
def experience():
    """Render the experience page."""
    return render_template('experience.html')

@app.route('/contact')
def contact():
    """Render the contact page."""
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)