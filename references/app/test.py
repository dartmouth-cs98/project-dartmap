import parsedatetime as pdt
import datetime
import time
from scrape import get_event2

ptc = pdt.Constants()
ptc.YearParseStyle = 0
cal = pdt.Calendar()
test = "the event is on Sunday November 9th at 6:45 pm."
test2 = "Governor Rick Perry will be speaking in Wilder 111 this Sunday, November 9th at 6:45 pm. End election season right by coming to hear from the governor of the great state of Texas. Governor Perry has served as the governor of Texas for over a decade and was a 2012 presidential candidate. His remarks will focus on the economic state of Texas and the nation and the economic policy he helped form while serving as governor. He will additionally address other policy issues that face our nation today. This event is hosted by the College Republicans and open to all students."
result = cal.parseDateText(test)
x = cal.parse(test)[0]
print result
print x

result = cal.parseDateText(test2)
x = cal.parse(test2)[0]
print result
print x