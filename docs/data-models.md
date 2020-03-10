## Data models
**Diory**
```
id: uri
text: string
image: url
style: object
date: ISOString
longitude: string
latitude: string
modified: ISOString
data: object
links: 
    [path]: diory
```

**Home**
```
id: uri
rooms:
    [path]: diory
```
Diory is in the room diograph with room id

**Room**
```
id: uri
diograph:
    [id]: diory
```            
