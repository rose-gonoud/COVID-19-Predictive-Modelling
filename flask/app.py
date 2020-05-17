import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, text

from flask import Flask, jsonify, request
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///../assets/data/Project2.db")

Base = automap_base()

Base.prepare(engine, reflect=True)

# Save reference to the unemployment table
unemployment = Base.classes.unemploymentData

# Flask Setup
app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def welcome():

    start_menu = """<br>
                Explore our US unemployment data API! 
                <br><br>
                Follow route "/unemploymentData" for all US unemployment data from Jan 2019 through April 2020
                <br><br>
                Add optional start and end date parameters by inputing dates in the form of:
                <br>
                start_date or end_date=yyyy-mm-dd
                <br><br>
                Add an optional state filter, such as:
                <br>
                state=NY,AL,NJ
                <br>
                Input only two-letter capitalized state and territory abbreviations, with no spaces between list items.
                <br><br>
                You may choose to input only a start date, only an end date, or only a state filter.
                <br>
                Parameters left unspecified will default to the most general query possible.
                <br>
                Query parameters may be input in any order.
                """

    return start_menu

@app.route("/unemploymentData")
def unemploymentData():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    stateparam = request.args.get("state_abbr")

    session = Session(engine)

    if not start_date:
        # query the min of all file_week_ended entries if no date is given in that parameter
        min_start_date = session.query(func.min(unemployment.file_week_ended))
        start_date = min_start_date

    if not end_date:
        # query the max of all file_week_ended entries if no date is given in that parameter
        max_end_date = session.query(func.max(unemployment.file_week_ended))
        end_date = max_end_date

    if not stateparam:
        results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date)
    
    if stateparam:
        print("---------------------------")
        print("Whats in State:", stateparam)
        print("Whats it's type:", type(stateparam))
        print("---------------------------")
        stateparam = stateparam.split(',')
        print("Whats in State after split:", stateparam)
        print("What type is it now?", type(stateparam))
        print("---------------------------")

        if isinstance(stateparam, list):
            print("Are you making it to this line?")
            # this should make an array of states valid and handle the single-state case
            results = session.query(unemployment).filter(unemployment.file_week_ended >= start_date).filter(unemployment.file_week_ended <= end_date).filter(unemployment.state_abbr.in_(stateparam)).all()

    session.close()

    data = []
    for result in results:
        data.append({
            "state": result.state,
            "state_abbr": result.state_abbr,
            "file_week_ended": result.file_week_ended,
            "initial_claims": result.initial_claims,
            "reflecting_week_ended": result.reflecting_week_ended,
            "continued_claims": result.continued_claims,
            "covered_employment": result.covered_employment,
            "insured_unemployment_rate": result.insured_unemployment_rate
        })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)