# Modeling the Spread of COVID-19

The purpose of this project is to develop a COVID-19 machine learning model that predicts the number of COVID-19 cases 30 days post-lockdown for each county within each US state, using variables from the social vulnerability index maintained by the CDC and unemployment claims.

The model will compute the weight of each input social and economic variable, and the relative predictive power of each variable will change how it informs each case-number prediction. The results will be displayed visually on a dashboard. A multi-layerer, color-coded, interactive map will be the dashboard's main feature, and it will display the predicted case numbers, the input variables, and each variable's predictive power in to-be-determined ways.

The dashboard will at minimum also include a summary statistics panel and a few graphical data viualizations that are user responsive -- the user can select states, counties, and time windows they are interested in, and visualization will update accordingly. We plan to also include a raw data page for transparency into our sources and methods.


### Data Sources
https://svi.cdc.gov
https://covid-19-statistics.p.rapidapi.com
https://oui.doleta.gov/unemploy/claims.asp

### Division of Labor in Development

#### Shaun

- [ ] Data exploration and beginning stages of jupyter notebook creation for neural net machine learning model development.

#### Rose

- [ ] Will write an instance of the most recent COVID data from an API call to a CSV. This will be distributed to Shaun, Ryan, and Alec so they may all develop candidate neural nets with different parameters. Other variables for their modelling will come from an unemployment dataset (as CSV) and the CDC's social vulnerabolity index data. They'll do their model building in parallel, and on Monday we will compare effectiveness.
- [ ] Will take my previously deployed Unemployment API from Heroku and add an additional route with a new unemployment dataset. The new dataset has more updated figures from a different source, and its data is resolved down to the county level, rather than just the state level.
- [ ] Will clean up and fork my previous Project 2 repo so the only contributors to this final project are the four of us, and those updates will not erase or overwrite my Project 2 teammates' work.

#### Alec

- [ ] Data exploration and beginning stages of jupyter notebook creation for neural net machine learning model development.

#### Ryan

- [ ] Data exploration and beginning stages of jupyter notebook creation for neural net machine learning model development.

#### Unassigned

- [ ] Dashboard page updates, in particular new/additional figures.
