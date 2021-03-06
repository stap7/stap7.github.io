
var SAMPLE_CODE = new Map([

	['some text', `[
 "Hello World!",
 "a STAP container is just a list of item updates"
]`],

	['buttons', `[
 {"id":"Press me","type":"btn"},
 {"id":"No, press me","type":"btn"}
]`],

	['container w/ checkboxes', `[
 {
  "id":"Choose cars",
  "df":{"type":"select"},
  "v":[
   {"id":"Subaru"},
   {"id":"Ford"},
   {"id":"Tesla"}
  ]
 }
]`],

	['container w/ radio buttons', `[
 {
  "id":"Choose a car",
  "df":{"type":"select","group":"cars"},
  "v":[
   {"id":"Subaru"},
   {"id":"Ford"},
   {"id":"Tesla"}
  ]
 }
]`],

	['table', `[
 {
  "id":"Personnel",
  "type":"table",
  "head":1,
  "df":{
    "group":"wrk",
    "rnd":0.01,
    "unit":"$"
  },
  "v":[
   ["Name","Gender","Salary","Working this week"],
   {"id":"P801","v":["Max Brownwell","female",2.75,{"type":"select"}]},
   {"id":"P807","v":["Carrie Vanilla","male",2,{"type":"select"}]},
   {"id":"P811","v":["Jenny Jerrings","female",1,{"type":"select"}]},
   {"id":"P832","v":["Jerry Jennings","male",1,{"type":"select"}]}
  ]
 },
 "there are several element types in STAP, including table, popup, path, mkdn, and html"
]`],

	['shapes', `{
 "df":{"w":130,"v":"some text"},
 "v":[
  {"shape":0,"bg":2},
  {"shape":1,"bg":3},
  {"shape":2,"bg":4},
  {"shape":["0,100","50,-50","100,100"],"bg":"#faa"}
 ]
}`],

	['animation', `[
 {"h":100,"v":
  [
   {"v":"😊","x":70,"y":50,
    "onoverlap":{"v":"😖"},"onoverout":{"v":"😵"}},
   {"id":"box","title":"","lw":2,"w":30,"h":25,
    "shape":"round","onoverlap":{}},
   {"id":"box","x":150,"rot":720,"S":3,"ease":1},
   {"id":"box","y":70,"S":2,"ease":"bounce"}
  ]
 }
]`]


]);




var task = {
	
	start: function(){
		task.display({
			require:{options:['S','ease'],type:['mkdn']},
			template:`
				#Preview {background:linear-gradient(to bottom left,white 75%,#dee 85%,#9aa);box-shadow:-1px -1px 1px lightgray;padding:5px}
				#Warning {text-align:right}
				#Warning * {display:inline}
			`
		});
		task.display([
			{id:"Preview"},
			{id:"Sample Code"},
			{id:"STAP",v:"\n",in:2}
		]);
		for(var i of SAMPLE_CODE.keys())
			task.display([{id:"Sample Code",v:[{id:i,type:'btn'}]}]);
	},
	
	userAction: function(time,element,value){
		//TODO: ignore input, catch onkeydown
		task.display([{id:'Warning',v:null}]); //remove any previously shown warning
		if(element=='STAP'){
			try{
				value=JSON.parse(value);
				if(value.constructor===Array){
					task.display([{id:'Preview',v:null},{id:'Preview',P:0,v:value}]);
				}else if(value.constructor===Object){
					value.id='Preview';
					value.P=0;
					task.display([{id:'Preview',v:null},value]);
				}
			}catch(e){
				task.display([{id:'Warning',v:'Invalid JSON string',emp2:1}]);
			}
		}else{
			if(SAMPLE_CODE.has(element)){
				value=JSON.parse(SAMPLE_CODE.get(element));
				if(value.constructor===Array){
					task.display([{id:'STAP',v:SAMPLE_CODE.get(element)},{id:'Preview',v:null},{id:'Preview',P:0,v:value}]);
				}else if(value.constructor===Object){
					value.id='Preview';
					value.P=0;
					task.display([{id:'STAP',v:SAMPLE_CODE.get(element)},{id:'Preview',v:null},value]);
				}
			}
		}
	}
	
}

////////////////////////////////////////////////////////////////
// line below added for node.js
if(typeof(window)==='undefined'){task.end=function(){process.exit()};if(require.main===module){task.display=function(data){console.log(JSON.stringify(data))};process.stdin.on("data",function(s){let data;try{data=JSON.parse(s)}catch(e){console.log('{"error":"invalid JSON string"}');return}if(data.constructor!==Array||data.length!=3){console.log('{"error":"Invalid STAP 7 response. Expected [time,id,value]"}');return}task.userAction(data[0],data[1],data[2])});task.start()}else{exports.task=task}}
////////////////////////////////////////////////////////////////
