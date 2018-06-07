# vuejs-flask-survey-example
http://stackabuse.com/single-page-apps-with-vue-js-and-flask-restful-api-with-flask/

## Start up frontend
```
cd frontend
npm install
npm run dev
```

## Start up backend
```
cd backend
virtualenv venv
source venv/bin/activate
pip install Flask Flask-SQLAlchemy Flask-Migrate Flask-Script requests
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
python appserver.py
```

### Test API
```
python manage.py shell

In [1]: import pprint, requests, json

In [2]: resp = requests.get('http://localhost:8877/api/surveys/')

In [3]: resp.status_code

Out[3]: 200

In [5]: pp = pprint.PrettyPrinter()      

In [6]: pp.pprint(resp.json())

{u'surveys': []}

In [7]: survey = Survey(name='Dogs')

In [8]: question = Question(text='What is your favorite dog?')

In [9]: question.choices = [Choice(text='Beagle'), Choice(text='Rottweiler'), Choice(text='Labrador')]

In [10]: question2 = Question(text='What is your second favorite dog?')

In [11]: question2.choices = [Choice(text='Beagle'), Choice(text='Rottweiler'), Choice(text='Labrador')]

In [12]: survey.questions = [question, question2]

In [13]: db.session.add(survey)

In [14]: db.session.commit()

In [15]: surveys = Survey.query.all()

In [16]: for s in surveys:
    print('Survey(id={}, name={})'.format(s.id, s.name))
    for q in s.questions:
        print('  Question(id={}, text={})'.format(q.id, q.text))
        for c in q.choices:
            print('    Choice(id={}, text={})'.format(c.id, c.text))
   ....:             
Survey(id=1, name=Dogs)
  Question(id=1, text=What is your favorite dog?)
    Choice(id=1, text=Beagle)
    Choice(id=3, text=Labrador)
    Choice(id=2, text=Rottweiler)
  Question(id=2, text=What is your second favorite dog?)
    Choice(id=4, text=Beagle)
    Choice(id=6, text=Labrador)
    Choice(id=5, text=Rottweiler)

In [19]: resp = requests.get('http://localhost:8877/api/surveys/')

In [20]: resp.status_code
Out[20]: 200

In [21]: pp.pprint(resp.json())
{u'surveys': [{u'created_at': u'2018-06-07 01:39:46',
               u'id': 1,
               u'name': u'Dogs',
               u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 1,
                                             u'question_id': 1,
                                             u'text': u'Beagle'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 3,
                                             u'question_id': 1,
                                             u'text': u'Labrador'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 2,
                                             u'question_id': 1,
                                             u'text': u'Rottweiler'}],
                               u'created_at': u'2018-06-07 01:39:46',
                               u'id': 1,
                               u'survey_id': 1,
                               u'text': u'What is your favorite dog?'},
                              {u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 4,
                                             u'question_id': 2,
                                             u'text': u'Beagle'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 6,
                                             u'question_id': 2,
                                             u'text': u'Labrador'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 5,
                                             u'question_id': 2,
                                             u'text': u'Rottweiler'}],
                               u'created_at': u'2018-06-07 01:39:46',
                               u'id': 2,
                               u'survey_id': 1,
                               u'text': u'What is your second favorite dog?'}]}]}

In [22]: resp = requests.get('http://localhost:8877/api/surveys/1/')

In [23]: resp.status_code
Out[23]: 200

In [24]: pp.pprint(resp.json())
{u'survey': {u'created_at': u'2018-06-07 01:39:46',
             u'id': 1,
             u'name': u'Dogs',
             u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 1,
                                           u'question_id': 1,
                                           u'text': u'Beagle'},
                                          {u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 3,
                                           u'question_id': 1,
                                           u'text': u'Labrador'},
                                          {u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 2,
                                           u'question_id': 1,
                                           u'text': u'Rottweiler'}],
                             u'created_at': u'2018-06-07 01:39:46',
                             u'id': 1,
                             u'survey_id': 1,
                             u'text': u'What is your favorite dog?'},
                            {u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 4,
                                           u'question_id': 2,
                                           u'text': u'Beagle'},
                                          {u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 6,
                                           u'question_id': 2,
                                           u'text': u'Labrador'},
                                          {u'created_at': u'2018-06-07 01:39:46',
                                           u'id': 5,
                                           u'question_id': 2,
                                           u'text': u'Rottweiler'}],
                             u'created_at': u'2018-06-07 01:39:46',
                             u'id': 2,
                             u'survey_id': 1,
                             u'text': u'What is your second favorite dog?'}]}}
                             
In [25]: survey = {                                    
'name': 'Cars',
'questions': [{
'text': 'What is your favorite car?',
'choices': [
{ 'text': 'Corvette' },
{ 'text': 'Mustang' },
{ 'text': 'Camaro' }]
}, {
'text': 'What is your second favorite car?',
'choices': [
{ 'text': 'Corvette' },
{ 'text': 'Mustang' },
{ 'text': 'Camaro' }]
}]
}

In [26]: headers = {'Content-type': 'application/json'}

In [27]: resp = requests.post('http://localhost:8877/api/surveys/', headers=headers, data=json.dumps(survey))

In [28]: resp.status_code                        
Out[28]: 201

In [29]: pp.pprint(resp.json())                  
{u'created_at': u'2018-06-07 01:45:27',
 u'id': 2,
 u'name': u'Cars',
 u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:45:27',
                               u'id': 9,
                               u'question_id': 3,
                               u'text': u'Camaro'},
                              {u'created_at': u'2018-06-07 01:45:27',
                               u'id': 7,
                               u'question_id': 3,
                               u'text': u'Corvette'},
                              {u'created_at': u'2018-06-07 01:45:27',
                               u'id': 8,
                               u'question_id': 3,
                               u'text': u'Mustang'}],
                 u'created_at': u'2018-06-07 01:45:27',
                 u'id': 3,
                 u'survey_id': 2,
                 u'text': u'What is your favorite car?'},
                {u'choices': [{u'created_at': u'2018-06-07 01:45:27',
                               u'id': 12,
                               u'question_id': 4,
                               u'text': u'Camaro'},
                              {u'created_at': u'2018-06-07 01:45:27',
                               u'id': 10,
                               u'question_id': 4,
                               u'text': u'Corvette'},
                              {u'created_at': u'2018-06-07 01:45:27',
                               u'id': 11,
                               u'question_id': 4,
                               u'text': u'Mustang'}],
                 u'created_at': u'2018-06-07 01:45:27',
                 u'id': 4,
                 u'survey_id': 2,
                 u'text': u'What is your second favorite car?'}]}

In [30]: resp = requests.get('http://localhost:8877/api/surveys/')

In [31]: resp.status_code                        
Out[31]: 200

In [32]: pp.pprint(resp.json())      
{u'surveys': [{u'created_at': u'2018-06-07 01:39:46',
               u'id': 1,
               u'name': u'Dogs',
               u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 1,
                                             u'question_id': 1,
                                             u'text': u'Beagle'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 3,
                                             u'question_id': 1,
                                             u'text': u'Labrador'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 2,
                                             u'question_id': 1,
                                             u'text': u'Rottweiler'}],
                               u'created_at': u'2018-06-07 01:39:46',
                               u'id': 1,
                               u'survey_id': 1,
                               u'text': u'What is your favorite dog?'},
                              {u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 4,
                                             u'question_id': 2,
                                             u'text': u'Beagle'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 6,
                                             u'question_id': 2,
                                             u'text': u'Labrador'},
                                            {u'created_at': u'2018-06-07 01:39:46',
                                             u'id': 5,
                                             u'question_id': 2,
                                             u'text': u'Rottweiler'}],
                               u'created_at': u'2018-06-07 01:39:46',
                               u'id': 2,
                               u'survey_id': 1,
                               u'text': u'What is your second favorite dog?'}]},
              {u'created_at': u'2018-06-07 01:45:27',
               u'id': 2,
               u'name': u'Cars',
               u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 9,
                                             u'question_id': 3,
                                             u'text': u'Camaro'},
                                            {u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 7,
                                             u'question_id': 3,
                                             u'text': u'Corvette'},
                                            {u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 8,
                                             u'question_id': 3,
                                             u'text': u'Mustang'}],
                               u'created_at': u'2018-06-07 01:45:27',
                               u'id': 3,
                               u'survey_id': 2,
                               u'text': u'What is your favorite car?'},
                              {u'choices': [{u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 12,
                                             u'question_id': 4,
                                             u'text': u'Camaro'},
                                            {u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 10,
                                             u'question_id': 4,
                                             u'text': u'Corvette'},
                                            {u'created_at': u'2018-06-07 01:45:27',
                                             u'id': 11,
                                             u'question_id': 4,
                                             u'text': u'Mustang'}],
                               u'created_at': u'2018-06-07 01:45:27',
                               u'id': 4,
                               u'survey_id': 2,
                               u'text': u'What is your second favorite car?'}]}]}

In [33]: survey_choices = {                                                                                           
'id': 1,
'name': 'Dogs',
'questions': [
{ 'id': 1, 'choice': 1 },
{ 'id': 2, 'choice': 5 }]
}

In [34]: resp = requests.put('http://localhost:8877/api/surveys/1/', headers=headers, data=json.dumps(survey_choices))

In [35]: resp.status_code
Out[35]: 201

In [36]: pp.pprint(resp.json())
{u'created_at': u'2018-06-07 01:39:46',
 u'id': 1,
 u'name': u'Dogs',
 u'questions': [{u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                               u'id': 1,
                               u'question_id': 1,
                               u'text': u'Beagle'},
                              {u'created_at': u'2018-06-07 01:39:46',
                               u'id': 3,
                               u'question_id': 1,
                               u'text': u'Labrador'},
                              {u'created_at': u'2018-06-07 01:39:46',
                               u'id': 2,
                               u'question_id': 1,
                               u'text': u'Rottweiler'}],
                 u'created_at': u'2018-06-07 01:39:46',
                 u'id': 1,
                 u'survey_id': 1,
                 u'text': u'What is your favorite dog?'},
                {u'choices': [{u'created_at': u'2018-06-07 01:39:46',
                               u'id': 4,
                               u'question_id': 2,
                               u'text': u'Beagle'},
                              {u'created_at': u'2018-06-07 01:39:46',
                               u'id': 6,
                               u'question_id': 2,
                               u'text': u'Labrador'},
                              {u'created_at': u'2018-06-07 01:39:46',
                               u'id': 5,
                               u'question_id': 2,
                               u'text': u'Rottweiler'}],
                 u'created_at': u'2018-06-07 01:39:46',
                 u'id': 2,
                 u'survey_id': 1,
                 u'text': u'What is your second favorite dog?'}]}

In [37]: for c in Choice.query.all(): print(c, c.selected)
(<Choice 1>, 1)
(<Choice 2>, 0)
(<Choice 3>, 0)
(<Choice 4>, 0)
(<Choice 5>, 1)
(<Choice 6>, 0)
(<Choice 7>, 0)
(<Choice 8>, 0)
(<Choice 9>, 0)
(<Choice 10>, 0)
(<Choice 11>, 0)
(<Choice 12>, 0)
```
