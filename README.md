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
In [7]: 
```
