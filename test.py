import requests
url = "http://127.0.0.1:8000/"
req = requests.post(url + "api/accounts/login/",data={"username":"Bob","password":"123456789Bob"})
print(req.headers)
print(req.status_code)
print(req.text)