import requests
import urllib
import datetime
import time
import pytz
import calendar
import re
import string
from pytz import timezone
from datetime import datetime
from bs4 import BeautifulSoup


# Day keywords
DATE_KEYWORDS = {'today':"today",
    "tonight":"today",
    "tomorrow":"tomorrow",
    "monday":"0",
    "tuesday": "1",
    "wednesday":"2",
    "thursday":"3",
    "friday": "4",
    "saturday": "5",
    "sunday":"6"
    }

GROUP_NICKNAMES = {
    'delta delta delta':'TriDelt',
    'kappa kappa gamma':'Kappa',
    'alpha delta':'AD',
    'sigma phi epsilon':'SigEp',
    'alpha chi alpha':'Alpha Chi',
    'beta alpha omega':'Beta',
    'chi heorot':'Heorot',
    'collis governing board':'Collis',
    'kappa kappa kappa':'Tri-Kap',
    'kappa delta':'KD',
    'epsilon kappa theta': 'EKT',
    'sigma alpha epsilon':'SAE',
    'psi upsilon': 'Psi U',
    'zeta psi': 'Zete',
    'phi Delta alpha': 'Phi Delt',
    'alpha xi delta': 'AZD',
    'dartmouth outing club':'DOC',
    'bar.hop':'BarHop',
    'rockefeller student programs': 'Rocky'
    }

CATEGORIES_NAMES = [
    'Greek',
    'Social',
    'Sports',
    'Performances',
    'Talks and Discussions',
    'Misc'
]

CATEGORIES = [
    #Greek
    ['tridelt','kappa',' ad ','sigep','alpha chi',' beta ','heorot','tri-kap','trikap',' kd ',' ekt ',' sae ',' psi u ',' psiu ',' zete ',
        'phi delt',' azd ', 'alpha theta'],
    #Social
    ['collis','one wheelock','collis after dark','barhop', 'creative gaming club'],

    #Sports
    ['football','soccer','hockey','baseball','basketball','tennis','volleyball','track & field','cross country','squash'],

    # Performances
    ['acapella','dog day','decibelles','brovertones','cords','rockapellas','subtleties','dodecaphonics','dodecs','aires',
        'dartmouth symphony orchestra','soul scribes','casual thursday','rude mechanicals', 'street soul'],

    # Talks and Discussions
    ['rocky', 'dartmouth physics society']
]
# TO DO
# Scrape time and location.
# Make scraping faster and more efficient
# incorporate database and get rid of only getting 10 events.
# Make regex checking time more efficient/intuitive. 
# some blitz_dates not showing up
# Talks and Discussions not opening
# let multiple sections be open
# do we need to add new categories to blitz-machine.html at the bottom with .click() and .show() and hide() - for reminder just look in this file
# display the date for "upcoming", so that we can see if its 3 days from now, 4 days from now, etc.
# sort by time
# Finding time but not printing correctly
# is it only returning an event if it is in the future?


# Helper function that checks if a string can be converted to an int.
def isint(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False

#get_content2 and get_event2 are now the functions that I am using.
def get_content(): #returns a list of recent blitzes
    # Get the month and week of month of today.
    date = datetime.now().date() 
    year = date.year
    year = year % 2000  # only the last two digits of year.
    month = date.month
    padded_month = ("%02d" % month)
    day = date.day
    week_of_month = ((day + 6)/7)
    letter_for_week = chr(ord('a') + week_of_month - 1) # first week is A, etc.

    last_year = year
    last_month = month
    last_week = week_of_month - 1
    # Get the previous week.
    if week_of_month == 1:
        last_month = month - 1
        last_week = 5
        if month == 1:
            last_month = 12
            last_year = year - 1
        if last_month == 2:
            last_week = 4
    padded_last_month = ("%02d" % last_month)
    letter_for_last_week = chr(ord('a') + last_week - 1) # first week is A, etc.

    # Scrape for this week.
    listserv_url = 'https://listserv.dartmouth.edu/scripts/wa.exe?A1=ind' + str(year) + str(padded_month) + letter_for_week + '&L=CAMPUS-EVENTS&O=D&H=0&D=1&T=1'

    # Finds the correct link for the list of this week's events, 
    # then gets the basic info for all of those events

    r = requests.get(listserv_url) # stores url response in var "r"
    soup = BeautifulSoup(r.text) # stores url response in a BeautifulSoup object for later parsing
    events = [] # initialize vars
    iterator = 0
    for link in soup.find_all('a'): # go through every link from the url
        if iterator > 0: # we only want to go through this loop once, iterator makes sure of that
            break
        href = link.get('href') # href now holds the href of the link
        if href: # if href isn't None
            if  '/scripts/wa.exe?A1=' in href: # if href contains this string, it's what we're looking for
                   r = requests.get('https://listserv.dartmouth.edu'+href) # makes a new request from this link
                   soup2 = BeautifulSoup(r.text) # puts it into beautifulsoup format
                   for event in soup2.find_all('a'): # for all of the links on this page
                       if event.get('href'):
                           if '/scripts/wa.exe?A2=' in event.get('href'):
                               data = []
                               data.append(event.text) # add the event title
                               data.append(urllib.quote_plus(event.get('href'))) # add the url for the event
                               events.append(data)
                   iterator = iterator + 1

    # Scrape for last week
    # NOTE: I will move this soup/link/event/iterator stuff into a separate function,
    # once I know it is okay to do that.
    # h: yeah that'd be good! also might want to get the "from" field (who the event was sent from) as well since that's part of it
    listserv_url2 = 'https://listserv.dartmouth.edu/scripts/wa.exe?A1=ind' + str(last_year) + str(padded_last_month) + letter_for_last_week + '&L=CAMPUS-EVENTS&O=D&H=0&D=1&T=1'

       #same comments as above for this loop
    r = requests.get(listserv_url2)
    soup3 = BeautifulSoup(r.text)
    iterator = 0
    for link in soup3.find_all('a'):
        if iterator > 0:
            break
        href = link.get('href')
        if href:
            if  '/scripts/wa.exe?A1=' in href:
                   r = requests.get('https://listserv.dartmouth.edu'+href)
                   soup4 = BeautifulSoup(r.text)
                   for event in soup4.find_all('a'):
                       if event.get('href'):
                           if '/scripts/wa.exe?A2=' in event.get('href'):
                               data = []
                               data.append(event.text)
                               data.append(urllib.quote_plus(event.get('href')))
                               events.append(data)
                   iterator = iterator + 1
    return events

def get_event(event_url): # This method returns all the relevant information for a specific event URL given
    #initialize vars
    url = ''
    txt = ''
    data = []
    event_url = ''+urllib.unquote_plus(event_url)
    event_subject = ''

    #get request
    r = requests.get('https://listserv.dartmouth.edu'+event_url)
    soup = BeautifulSoup(r.text)

    #get subject, from, and date
    event_subject = soup.find(text="Subject:").findNext('a').contents[0]            # finds subject of event
    event_from = soup.find(text="From:").findNext('p').contents[0].replace('<','')  # finds from of event
    date = soup.find(text="Date:").findNext('p').contents[0].replace('<','')         # finds date of blitz sent out

    #formats the date (NOTE: there's a bug where some events don't have +0000 but -4000, which throws an error)
    utc_dt = datetime.strptime(date.replace(' +0000',''),'%a, %d %b %Y %H:%M:%S').replace(tzinfo=pytz.utc) #
    loc_dt = utc_dt.astimezone(timezone('US/Eastern'))
    event_date = loc_dt.strftime('%A, %b %d %I:%M%p')

    #get txt by starting a new request from the link to text/plain
    for link in soup.find_all('a'):
        if (link.get('href')):
            if (link.text == 'text/plain'): #text/html, get this url and pass it in to the view.py
                url = link.get('href')
                break
    if (url != ''):
        r = requests.get('https://listserv.dartmouth.edu'+url) # makes a new request to get the text from the URL that outputs plaintext
        soup = BeautifulSoup(r.text)
        for pre in soup.find_all('pre'):
            txt = pre.text

    #return all
    data.append(txt)
    data.append(event_subject)
    data.append(event_from)
    data.append(event_date)
    return data

#returns a list of recent blitzes
def get_content2(): 
    # Get the month and week of month of today.
    date = datetime.now().date() 
    year = date.year
    year = year % 2000  # only the last two digits of year.
    month = date.month
    padded_month = ("%02d" % month)
    day = date.day
    week_of_month = ((day + 6)/7)
    letter_for_week = chr(ord('a') + week_of_month - 1) # first week is A, etc.

    last_year = year
    last_month = month
    last_week = week_of_month - 1
    # Get the previous week.
    if week_of_month == 1:
        last_month = month - 1
        last_week = 5
        if month == 1:
            last_month = 12
            last_year = year - 1
        if last_month == 2:
            last_week = 4
    padded_last_month = ("%02d" % last_month)
    letter_for_last_week = chr(ord('a') + last_week - 1) # first week is A, etc.

    # Scrape for this week.
    listserv_url = 'https://listserv.dartmouth.edu/scripts/wa.exe?A1=ind' + str(year) + str(padded_month) + letter_for_week + '&L=CAMPUS-EVENTS&O=D&H=0&D=1&T=1'

    # Finds the correct link for the list of this week's events, 
    # then gets the basic info for all of those events
    events = []
    getEventsFromWeek(listserv_url, events)
    if len(events) > 10:
        return events

    # Scrape for last week
    listserv_url_lastweek = 'https://listserv.dartmouth.edu/scripts/wa.exe?A1=ind' + str(last_year) + str(padded_last_month) + letter_for_last_week + '&L=CAMPUS-EVENTS&O=D&H=0&D=1&T=1'
    getEventsFromWeek(listserv_url_lastweek, events)

    return events


# This method returns all the relevant information for a specific event URL given
def get_event2(event_url): 
    #initialize vars
    url = ''
    htmlurl = ''
    txt = ''
    data = []
    event_url = ''+urllib.unquote_plus(event_url)
    event_subject = ''

    #get request
    r = requests.get('https://listserv.dartmouth.edu'+event_url)
    soup = BeautifulSoup(r.text)

    #get subject, from, and date
    event_subject = soup.find(text="Subject:").findNext('a').contents[0].strip()     # finds subject of event
    event_from = soup.find(text="From:").findNext('p').contents[0].replace('<','')   # finds from of event
    date = soup.find(text="Date:").findNext('p').contents[0].replace('<','')         # finds date that the blitz sent out

    event_from = event_from.strip()
    if event_from.lower() in GROUP_NICKNAMES.keys():
        event_from = GROUP_NICKNAMES.get(event_from.lower())

    try:
    	utc_dt = datetime.strptime(date.replace(' +0000',''),'%a, %d %b %Y %H:%M:%S').replace(tzinfo=pytz.utc)
    except:
        try:
            utc_dt = datetime.strptime(date.replace(' -0400',''),'%a, %d %b %Y %H:%M:%S').replace(tzinfo=pytz.utc)
    	except:
            return None
    loc_dt = utc_dt.astimezone(timezone('US/Eastern'))
    event_date = loc_dt.strftime('%A, %b %d %I:%M%p')

    #get txt by starting a new request from the link to text/plain
    for link in soup.find_all('a'):
        if (link.get('href')):
            if (link.text == 'text/plain'):
                url = link.get('href')
            if (link.text == 'text/html'):
                htmlurl = urllib.quote_plus('https://listserv.dartmouth.edu'+ link.get('href'))
            if (url !='') and (htmlurl != ''):
                break

    if (url != ''):
        r = requests.get('https://listserv.dartmouth.edu'+url) # makes a new request to get the text from the URL that outputs plaintext
        soup = BeautifulSoup(r.text)
        for pre in soup.find_all('pre'):
            txt = pre.text

    # Information about today and about the message.
    nowDay = datetime.now().date().day
    messageDay = loc_dt.date().day
    messageMonth = loc_dt.date().month
    daysInMessageMonth = calendar.monthrange(loc_dt.date().year, messageMonth)[1]
    thisEvent = {'from':event_from,'subject':event_subject,'blitz_date':loc_dt,'category':'Misc','time_event':'','date_event':'', 'html':htmlurl}

    findCategory(thisEvent, event_from.lower())

    # Look for information in the blitz subject line first.
    words = re.split('[@\- ]', event_subject)
    searchForEventInfo(words, thisEvent, messageDay, messageMonth, nowDay, daysInMessageMonth, loc_dt)

    # If we have all the event information that we need.
    if (thisEvent['date_event'] != '' and thisEvent['time_event'] != ''):
        #print 'Found date. Subject: ' + thisEvent['subject'] + ' Category: ' + thisEvent['category']
        return thisEvent

    # Now go through the actual blitz message.
    words = re.split('[@\- ]', txt)
    searchForEventInfo(words, thisEvent, messageDay, messageMonth, nowDay, daysInMessageMonth, loc_dt)

    # Return the event if it contained an event date.
    if thisEvent['date_event'] != '':
        return thisEvent

    return None

# Function that searches for event information in a list of words.
# @words - a list of strings, which are the words that we are looping through to look for keywords.
# @thisEvent - the event that we are looking for a date for.
# @messageDay - the day of the month of the message.
# @messageMonth - the month of the message.
# @nowDay - the day of the month of right now.
# @daysInMessageMonth - the number of days in the month the message was sent in.
# @loc_dt - datetime object for the message
def searchForEventInfo(words, thisEvent, messageDay, messageMonth, nowDay, daysInMessageMonth, loc_dt):
    # Loop through all the words, looking for event-related keywords.
    for word in words:

        if word == "":
            continue

        # Remove all punctuation, spaces, and make lower case.
        word = word.lower().strip().strip(string.punctuation)

        # Check if the word is a time, if we have not found time already.
        if thisEvent['time_event'] == '':
            time = None
            time = time_match(word)
            if time:
                thisEvent['time_event'] = time

        # If the event does not have a category, check if the word is a keyword.
        if (thisEvent['category'] == 'Misc'):
            findCategory(thisEvent, word)

        # If we do not know the event date and if the word is an date keyword.
        if thisEvent['date_event'] == '' and word in DATE_KEYWORDS.keys():
            classifier = DATE_KEYWORDS.get(word) # What the word signifies.
            findEventDate(thisEvent, classifier, messageDay, messageMonth, nowDay, daysInMessageMonth, loc_dt)

            # If we have all the event information that we need.
            if (thisEvent['date_event'] != '' and thisEvent['time_event'] != ''):
                #print 'Found date. Subject: ' + thisEvent['subject'] + ' Category: ' + thisEvent['category']
                return thisEvent

# Checks what day the classifier implies. Does so by comparing the message date and the
# current date, with regard to the classifier.
# @event - the event that we are looking for a date for.
# @classifier - the date-implying classifier.
# @messageDay - the day of the month of the message.
# @nowDay - the day of the month of right now.
# @daysInMessageMonth - the number of days in the month the message was sent in.
# @loc_dt - datetime object for the message
def findEventDate(event, classifier, messageDay, messageMonth, nowDay, daysInMessageMonth, loc_dt):
    # If the word implies today.
    if classifier == "today":
        # check if the event message was sent today
        if messageDay == nowDay:
            event['date_event'] = 'today'

    # If the word implies tomorrow.
    elif classifier == "tomorrow":
        # Check if the event message was sent today or yesterday.
        if messageDay == nowDay:
            event['date_event'] = 'tomorrow'
        elif (messageDay == (nowDay - 1)) or (messageDay + 1 == nowDay + daysInMessageMonth):
            event['date_event'] = 'today'

    # If the word implies a day of the week.
    elif isint(classifier) and (int("0") <= int(classifier) <= int("6")):
        # Need to deal with month overlaps
        eventDayofWeek = int(classifier)

        # Find which day the event is on based on the word and the message date.
        daysFromMessage = (eventDayofWeek - loc_dt.date().weekday()) % 7
        eventDay = messageDay + daysFromMessage

        # If the message is from last month.
        if datetime.now().date().month > messageMonth:
            eventDay = eventDay - daysInMessageMonth

        # If the eventDay is in the future.
        if eventDay == nowDay:
            event['date_event'] = 'today'
        elif eventDay == (nowDay + 1):
            event['date_event'] = 'tomorrow'
        elif eventDay > nowDay:
            event['date_event'] = 'upcoming'

# Checks if a possibleKeyword signifies a category for the event.
# @event - the event object that we are dealing with.
# @possibleKeyword - a word or phrase that might signify a keyword.
# @return - nothing. Changes the event object directly.
def findCategory(event, possibleKeyword):
    # All categories are in categories_names, and misc is only in categories_names.
    if (len(CATEGORIES) +  1)!= len(CATEGORIES_NAMES):
        raise Exception("CATEGORIES should have one less entry than CATEGORIES_NAMES")

    # Check all categories.
    for i in range(len(CATEGORIES)):
        if possibleKeyword in CATEGORIES[i]:
            event['category'] = CATEGORIES_NAMES[i]
            return

# Goes through a listserv page of the events for that week. Goes through each event,
# and looks for event information. Keeps track of all events that are in the future.
# @url - the url for the listserv page for the events of that week.
# @events - the list of event objects.
# return - nothing. Changes the events list directly.
def getEventsFromWeek(url, events):
    r = requests.get(url) # stores url response in var "r"
    soup = BeautifulSoup(r.text) # stores url response in a BeautifulSoup object for later parsing
    iterator = 0
    for link in soup.find_all('a'): # go through every link from the url
        if iterator > 0: # we only want to go through this loop once, iterator makes sure of that
            break
        href = link.get('href') # href now holds the href of the link
        if href: # if href isn't None
            if  '/scripts/wa.exe?A1=' in href: # if href contains this string, it's what we're looking for
                r = requests.get('https://listserv.dartmouth.edu'+href) # makes a new request from this link
                soup2 = BeautifulSoup(r.text) # puts it into beautifulsoup format
                for event in soup2.find_all('a'): # for all of the links on this page
                    if event.get('href'):
                        if '/scripts/wa.exe?A2=' in event.get('href'):
                            newEvent = get_event2(urllib.quote_plus(event.get('href')))
                            if newEvent:
                                foundMatch = False
                                for event in events:
                                    if newEvent['from'] == event['from'] and newEvent['date_event'] == event['date_event'] and newEvent['time_event'] == event['time_event']:
                                        foundMatch = True
                                if not foundMatch:
                                    events.append(newEvent)
                            #TESTING - only get 10 events
                            if len(events) >= 10:
                                return
                iterator = iterator + 1

# Looks for a regex match to a time pattern.
# @word - the word that might signify a time.
# @return - the part of the word that matches with a time, or None.
def time_match(word):
    if word == "noon":
        return "Noon"
    if word == "midnight":
        return "Midnight"
    # Search for times.
    match = re.search(r'(^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$)|(^[1-9]$)|(^1[0-2]$)|(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m)|([1-9][ap]m)|(1[0-2][ap]m)', word)
    if match:
        time = match.group()

        # Append :00pm to end if not present.
        # Only edits times that have no colon and no am/pm.
        # Example: replaces 2 with 2:00pm
        if re.search(r'((\:[0-9][0-9])|([ap]m))', time) == None:
            time = time + ":00pm"
            
        # Add :00 if not present.
        # Example: replaces 4pm with 4:00pm
        if re.search(r'(\:[0-9][0-9])', time) == None:
            time = re.sub(r'(pm)', r':00pm',time)
            time = re.sub(r'(am)', r':00am',time)
        
        # Add pm if not present.
        # Example: replaces 2:00 with 2:00pm
        if re.search(r'([ap]m)', time) == None:
            time = time + "pm"
        return time

    return match
