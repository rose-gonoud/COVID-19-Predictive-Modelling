# Modeling the Spread of COVID-19

The purpose of this project is to develop a COVID-19 machine learning model that predicts the number of COVID-19 cases 30 days post-lockdown for each county within each US state, using variables from the social vulnerability index maintained by the CDC and unemployment claims.

The model will compute the weight of each input social and economic variable, and the relative predictive power of each variable will change how it informs each case-number prediction. The results will be displayed visually on a dashboard. A multi-layerer, color-coded, interactive map will be the dashboard's main feature, and it will display the predicted case numbers, the input variables, and each variable's predictive power in to-be-determined ways.

The dashboard will at minimum also include a summary statistics panel and a few graphical data viualizations that are user responsive -- the user can select states, counties, and time windows they are interested in, and visualization will update accordingly. We plan to also include a raw data page for transparency into our sources and methods.

DOL unemployment statistics reported 1995/01/01 through 2020/05/23

### Data Sources

https://svi.cdc.gov
https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics
https://oui.doleta.gov/unemploy/claims.asp
