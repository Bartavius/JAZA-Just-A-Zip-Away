import requests
url = "http://127.0.0.1:8000/"
req = requests.post(url + "api/accounts/login/",data={"username":"kim","password":"Jong Un"})
# req = requests.post(url + "api/accounts/login/",data={"username":"admin","password":"123456789Jaza"})
# print(req.headers)
# print(req.status_code)
print(req.text) 
headers = {
    "Authorization":("Bearer " + req.json()["access_token"])
}

req = requests.get(url+"api/post/view-applied/",headers=headers)

# req = requests.post(url + "api/post/apply/",json={"id":9}, headers=headers)
print(req.text)