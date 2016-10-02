from flask import render_template, abort, request, redirect, g, flash, session, url_for
from flask.ext.login import login_user, logout_user, current_user, login_required
from calendar import Calendar
from datetime import date
from app import app, lm
from scrape import get_content, get_event, get_event2, get_content2
from datetime import datetime
from bs4 import BeautifulSoup
import requests
import urllib
import json
import time
from flask.ext.wtf import Form
from wtforms import StringField
from wtforms.validators import DataRequired

class User():
    def __init__(self, userid=None, username=None, password=None):
        self.userid = userid
        self.username = username
        self.password = password

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.userid)

    def __repr__(self):
        return '<User %r>' % self.username

class LoginForm(Form):
	password = StringField('Password', validators=[DataRequired()])

# Try to make an HTTP call, checking the status code to see if the call was successful.
# @httpMethod - should be 'get', 'post', 'patch, or 'put'.
# returns None if it fails. Returns the response if succesful.
def tryHTTP( httpMethod, url, numTries=5, payload=None ):
	if httpMethod == 'get':
		response = requests.get( url )

		# 200 is the status code for success.
		if response.status_code != 200:
			for i in range( numTries ):
				response = requests.get( url )
				if response.status_code == 200:
					break
			if response.status_code != 200:
				return None
		return response

	elif httpMethod == 'patch':
		response = requests.patch( url )

		if response.status_code != 200:
			for i in range( numTries ):
				response = requests.patch( url )
				if response.status_code == 200:
					break
			if response.status_code != 200:
				return None
		return response

	elif httpMethod == 'put':
		response = requests.put( url, data=json.dumps( payload ) )

		if response.status_code != 200:
			for i in range( numTries ):
				response = requests.put( url, data=json.dumps( payload ) )
				if response.status_code == 200:
					break
			if response.status_code != 200:
				return None
		return response

	elif httpMethod == 'post':
		response = requests.post( url, data=json.dumps( payload ) )
		print 'post response: ' + response.content
		print 'payload was: ' + str(payload)

		if response.status_code != 200:
			for i in range( numTries ):
				response = requests.post( url, data=json.dumps( payload ) )
				if response.status_code == 200:
					break
			if response.status_code != 200:
				return None
		return response

@lm.user_loader
def load_user(Id):
	return User("1", "hi", "hi")


@app.before_request
def before_request():
    g.user = current_user

@app.route('/idealab')
def idealab():
	return render_template('idealab.html')

@app.route( '/login', methods=['GET', 'POST'] )
def login (  ):
	form = LoginForm(  )

	if form.validate_on_submit(  ):
		if form.password.data == "girlscout" and login_user( User( "1", "hi", "hi" ) ):
			flash( "Login was succesful!" )
			return redirect( url_for( "idealab" ) )
		else:
			flash( "Login failed!" )

	return render_template( 'login.html', form=form )


@app.route( '/search', methods = ['POST'] )
@login_required
def search(  ):
	query    = str( request.form['query'] ).lower(  )

	# Production
	prod_url = 'http://editorial.quick1y.com/v1/suggestion?q=(prod:1,queryFragment:' + query + ')&offset=0&limit=40'
	r_prod   = tryHTTP( 'get', prod_url, 5 )
	if r_prod is None:
		return render_template( 'idealab.html' )

	prod = r_prod.json(  )['records']
	if not len( prod ) > 0:
		prod = [{u'queryFragment': query, u'googleAvgRank': u'1', u'suggestion': u'No Entries in Production', u'prod': u'1', u'newRank': u'1'}]

	# Non-Production
	non_prod_url = 'http://editorial.quick1y.com/v1/suggestion?q=(prod:0,queryFragment:' + query + ')&offset=0&limit=40'
	r_non_prod   = tryHTTP( 'get', non_prod_url, 5 )
	if r_non_prod is None:
		return render_template( 'idealab.html' )

	non_prod = r_non_prod.json(  )['records'] 
	if not len( non_prod ) > 0:
		non_prod = [{u'queryFragment': query, u'googleAvgRank': u'1', u'suggestion': u'No Entries in Non-Production', u'prod': u'0', u'newRank': u'1'}]

	return render_template( 'search.html', data=prod, non_prod_data=non_prod, query=query )

@app.route( '/update', methods = ['POST'] )
@login_required
def update(  ):
	time.sleep( 1.5 )
	query = request.args.get( 'query' )

	prod_url = 'http://editorial.quick1y.com/v1/suggestion?q=(prod:1,queryFragment:' + query + ')&offset=0&limit=40'
	r_prod   = tryHTTP( 'get', prod_url, 5 )
	if r_prod is None:
		return render_template( 'idealab.html' )

	prod = r_prod.json(  )['records']
	if not len( prod ) > 0:
		prod = [{u'queryFragment': query, u'googleAvgRank': u'1', u'suggestion': u'No Entries in Production', u'prod': u'1', u'newRank': u'1'}]


	non_prod_url  = 'http://editorial.quick1y.com/v1/suggestion?q=(prod:0,queryFragment:' + query + ')&offset=0&limit=40'
	r_non_prod    = tryHTTP( 'get', non_prod_url, 5 )
	if r_non_prod is None:
		return render_template( 'idealab.html' )

	non_prod = r_non_prod.json(  )['records'] 
	if not len( non_prod ) > 0:
		non_prod = [{u'queryFragment': query, u'googleAvgRank': u'1', u'suggestion': u'No Entries in Non-Production', u'prod': u'0', u'newRank': u'1'}]

	return render_template( 'search.html', data=prod, non_prod_data=non_prod, query=query )

@app.route( '/_refresh' )
def _refresh(  ):
	add_to_prod      =  request.args.get( 'add_to_prod' )      .split(  )
	remove_from_prod =  request.args.get( 'remove_from_prod' ) .split(  )
	update_rank      =  request.args.get( 'update_rank' )      .split(  )
	query            =  request.args.get( 'query' )

	for ID in remove_from_prod:
		url     = 'http://editorial.quick1y.com/v1/suggestion/' + ID
		payload = {'prod':'0'}
		r       = tryHTTP( 'put', url, 5, payload )

		if r    is None:
			return json.dumps( {'success':False, 'failedMethod':'put'} )

	for ID in add_to_prod:
		url     =  'http://editorial.quick1y.com/v1/suggestion/' + ID
		payload =  {'prod':'1'}
		r       =  tryHTTP( 'put', url, 5, payload )

		if r    is None:
			return json.dumps( {'success':False, 'failedMethod':'put'} )

	for rank_pair   in update_rank:
		ID_rank     =  rank_pair.split( "-" )
		ID          =  ID_rank[0].strip(  )
		rank        =  str( ID_rank[1].strip(  ) )
		url         =  'http://editorial.quick1y.com/v1/suggestion/' + ID
		rankPayload =  {'newRank':rank}

		r  =  tryHTTP( 'put', url, 5, rankPayload )
		if r is None:
			return json.dumps( {'success':False, 'failedMethod':'put'} )

	url  =   'http://editorial.quick1y.com/v1/queryfragment/' + query
	r    =   tryHTTP( 'patch', url, 5 )
	if r is  None:
		return json.dumps( {'success':False, 'failedMethod':'patch'} )

	return json.dumps( {'success' : True} )

# Add a custom suggestion to production.
@app.route( '/_add_suggestion' )
def _add_suggestion(  ):
	suggestion =  request.args.get( 'suggestion' )
	query      =  request.args.get( 'query' )

	url     = 'http://editorial.quick1y.com/v1/suggestion'
	payload = {'queryFragment': query, 'suggestion': suggestion, 'prod':'1', 'newRank':'30'}
	r       = tryHTTP( 'post', url, 5, payload )

	if r is None:
		return json.dumps( {'success':False, 'failedMethod':'post'} )

	url = 'http://editorial.quick1y.com/v1/queryfragment/' + query
	r   = tryHTTP( 'patch', url, 5 )
	if r is None:
		return json.dumps( {'success':False, 'failedMethod':'patch'} )

	return json.dumps( {'success':True} )

# @app.errorhandler(500)
# def internal_error(error):
# 	return redirect("idealab")

# @app.errorhandler(405)
# def method_not_allowed(error):
# 	return redirect("idealab")

# @app.errorhandler(404)
# def url_not_found(error):
# 	return redirect("idealab")

@app.route('/add_event')
def add_event():
	return render_template('addevent.html')

@app.route('/unsubscribe')
def unsubscribe():
	return render_template('unsubscribe.html')

@app.route('/faq')
def faq():
	return render_template('faq.html')

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/')
@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/ajax/blitzMachine')
def blitzMachine():
	hourNow = datetime.now().hour
	categories = []
	categories.append('Greek')
	categories.append('Social')
	categories.append('Sports')
	categories.append('Performances')
	categories.append('Talks and Discussions')
	categories.append('Misc')
	realEvents = get_content2()

	today_total_events = 0
	today_cat_freq = {'Greek':0,'Social':0,'Sports':0,'Performances':0, 'Talks and Discussions':0, 'Misc':0}
	tomorrow_total_events = 0
	tomorrow_cat_freq = {'Greek':0,'Social':0,'Sports':0,'Performances':0,'Talks and Discussions':0,'Misc':0}
	upcoming_total_events = 0
	upcoming_cat_freq = {'Greek':0,'Social':0,'Sports':0,'Performances':0,'Talks and Discussions':0, 'Misc':0}
	for event in realEvents:
		if (event['date_event'] == 'today'):
			today_cat_freq[event['category']] += 1
			today_total_events += 1
		elif (event['date_event'] == 'tomorrow'):
			tomorrow_cat_freq[event['category']] += 1
			tomorrow_total_events += 1
		elif (event['date_event'] == 'upcoming'):
			upcoming_cat_freq[event['category']] += 1
			upcoming_total_events += 1
		event['blitz_date'] = event['blitz_date'].strftime('%A, %b %d %I:%M%p')
		# if (not event['from'] in nicknames.keys()):
		# 	nicknames[event['from']] = event['from'].strip()

	if hourNow < 19 and hourNow > 4: # Display "Tonight" if between 7:00PM and 4:59AM
		isDay = True
	else:
		isDay = False
	return render_template('blitz-machine.html', is_day=isDay, categories=categories, today_cat_freq=today_cat_freq, 
		tomorrow_cat_freq=tomorrow_cat_freq, upcoming_cat_freq=upcoming_cat_freq,
		events=realEvents, today_total_events=today_total_events, tomorrow_total_events=tomorrow_total_events,
		upcoming_total_events=upcoming_total_events)

@app.route('/ajax/getEventHTML', methods=['GET'])
def getEventHTML():
	url = request.args.get("url")
	sender = request.args.get("from")
	date = request.args.get("date")
	if (date == None):
		date = ""
	else:
		date = "Sent " + date
	if url == None:
		return None
	url = ''+urllib.unquote_plus(url)
	r = requests.get(url)
	if "<div id=\"divtagdefaultwrapper\"" in r.text:
		indexOfDiv = r.text.index("<div id=\"divtagdefaultwrapper\"")
		headers = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"><html><head><title>LISTSERV 16.0 - CAMPUS-EVENTS Archives</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"><style type=\"text/css\" style=\"display:none\"><!-- p { margin-top: 0px; margin-bottom: 0px; }--></style></head><body style=\"background-color: white\">"
		headers = headers + "<h2 style=\"font-family: verdana; padding-bottom: 5px; margin-bottom: 0;\">Blitz from <em>" + sender + "</em></h2>"
		headers = headers + "<h4 style=\"font-family: verdana; font-weight: normal; color: grey; padding-top: 0; margin-top: 0;\">" + date + "</h4>"
	elif "</div><meta" in r.text:
		indexOfDiv = r.text.index("</div><meta")+len("</div>")
		headers = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"><html><head><title>LISTSERV 16.0 - CAMPUS-EVENTS Archives</title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"><style type=\"text/css\" style=\"display:none\"><!-- p { margin-top: 0px; margin-bottom: 0px; }--></style></head><body style=\"background-color: white\">"
		headers = headers + "<h2 style=\"font-family: verdana; padding-bottom: 5px; margin-bottom: 0;\">Blitz from <em>" + sender + "</em></h2>"
		headers = headers + "<h4 style=\"font-family: verdana; font-weight: normal; color: grey; padding-top: 0; margin-top: 0;\">" + date + "</h4>"
	else:
		headers = "<style>body { background-color: white; }</style>"
		indexOfDiv = 0
	output = headers + r.text[indexOfDiv:]
	while "b-print.png\"" in output:
		indexOfSrc = output.index("b-print.png")+11
		output = output[:indexOfSrc] + '' + output[indexOfSrc+1:]
	while "src=\"/scripts" in output or "src=\"/archives" in output:
		indexOfSrc = output.index("src=\"")+4
		output = output[:indexOfSrc] + 'https://listserv.dartmouth.edu' + output[indexOfSrc+1:]
	return output

@app.route('/scraper', methods=['GET'])
def scraper():
	url = request.args.get("event_url")
	if (url == None):
		return_data = get_content()
	else:
		return_data = get_event(url)
	return render_template('scrape.html',data=return_data,event_url=url)
