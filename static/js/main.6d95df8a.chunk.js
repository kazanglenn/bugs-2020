(this["webpackJsonpbugs-2020"]=this["webpackJsonpbugs-2020"]||[]).push([[0],{128:function(e,a,t){e.exports=t.p+"static/media/bugs2020.bfb2339d.png"},131:function(e,a,t){e.exports=t.p+"static/media/dark_sand_tile.578930a4.png"},133:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSIVQTuIOGSoThZERXQrVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIk6OToouU+L+k0CLGg+N+vLv3uHsHCI0KU82uCUDVLCMVj4nZ3KoYeIUAP4KYw4DETD2RXszAc3zdw8fXuwjP8j735+hT8iYDfCJxlOmGRbxBPLNp6Zz3iUOsJCnE58TjBl2Q+JHrsstvnIsOCzwzZGRS88QhYrHYwXIHs5KhEk8ThxVVo3wh67LCeYuzWqmx1j35C4N5bSXNdZojiGMJCSQhQkYNZVRgIUKrRoqJFO3HPPzDjj9JLplcZTByLKAKFZLjB/+D392ahalJNykYA7pfbPtjFAjsAs26bX8f23bzBPA/A1da219tALOfpNfbWvgI6N8GLq7bmrwHXO4AQ0+6ZEiO5KcpFArA+xl9Uw4YvAV619zeWvs4fQAy1NXyDXBwCIwVKXvd4909nb39e6bV3w9v4HKm51QXzgAAAAZiS0dEAFkAFABCT7091QAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+QCAww7IVC1CbgAAAJ2SURBVCjPjZO/TxNhGMe/d/e+LXdHbWkp10IbkDKUK9AghDioiUNjYsBEnViZZHTCRBf9Bxx1IsZAdNCYqIvWhISaOKASalpwqIFALQVOKOWOwv1yuTMaQ/RZvnnffD/v8+PNA5wcs94eogKYxX9EK4ARACKAocSkZGbeDdqJSckEMOTcjwAIuwDraJiX6cfeqVhOSNEiAMbSLQYAHGWEFC32TsVyvEwXnES/4MHTVyPxWCbsSU7E2wFkxQ7eBACxgzcAZJMT8WgsE/Z0jUlRAN0AwDhwUEjRxeREvD2U9hNDM00icJxbnntWlmrGyvT6d62gywBUFx5yHsqeeyL7dhZrxqmESPwJkdv+vHccPhPwGIemOTeWrwPIALABfGIAzCQmpXFLt1mxo0lnOIbe5i3z0Yst1rwnM+aRZXFelgWASk7R1XKDspSxSg+qTxlvD1EvPOwX3BIbyrGRv18i0fMhLX6pTVh/s6VVcoowcDNhNIU8xPXN3/iiceYPS2ZEu0/J13C0qxstSR+VzgaNll6fFwCCj9fInWttVnZTJ/VVTa9+2OX2vh5Y22/rz/7q+eLLAd/BxqHVHOMZ27JtrXrE7pdUo3XQT96PF//o2Z3ovpCi8/23uoLNcZ4QgQMROKLk941Q3ykqRpsYb4BygbRAauWDy/q2dReA7v5zX+eoFAml/VRZqhlzY/l6JacYbcMBbyWn6HNX8nVlqWaE0n7SOSpFAKQAwB1AafVVtQIguva6ugngulpuLACAWm5QAJmV6fXnnaPHEcf37Xd457CoDy8XN7oBFAAkWcpYAFhHba2gy8uFjZQD7vxrUWacrZo5yfAT7Nr+OBIJPnoAAAAASUVORK5CYII="},155:function(e,a,t){e.exports=t(278)},166:function(e,a,t){},278:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(13),i=t(16),o=t(49),c=t(18),s=t(50),u=t.n(s),g=t(11),d=t(12),m=function(){function e(){Object(g.a)(this,e),this.baseSpeed=Math.round(3*Math.random())}return Object(d.a)(e,[{key:"move",value:function(e,a,t,n,r){return{speed:Math.min(Math.max(0,e+2*Math.random()-1+this.baseSpeed),10),direction:a+(Math.random()-.5)/2}}}]),e}();function h(e,a,t){return Object(c.a)(Array(e)).map((function(){return{brain:new m,speed:Math.ceil(.5*(2+4*Math.random())),direction:Math.random()*Math.PI*2,tint:Math.round(16777215*Math.random()),x:Math.random()*a,y:Math.random()*t,_s:.6,rotation:0,width:15,height:30,energy:400,cycles:0,breedSize:Math.floor(10*Math.random())+10,breedThreshold:Math.floor(1e3*Math.random())+1e3,geneology:{id:u()(),parent:"SEED",children:[]}}}))}var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h(5,1e3,500),a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_BUGS":return a.payload.bugs;case"ADD_BUG":return[].concat(Object(c.a)(e),[a.payload.bug]);case"DELETE_BUG":return e.filter((function(e,t,n){return e.geneology.id!==a.payload.bug.geneology.id}));case"UPDATE_BUG":return e.map((function(e){return e.geneology.id===a.payload.bug.geneology.id?a.payload.bug:e}));default:return e}};function b(e,a,t){return Object(c.a)(Array(e)).map((function(){return{id:u()(),x:Math.round(Math.random()*a),y:Math.round(Math.random()*t),rotation:Math.random()*Math.PI*2,width:12,height:12,energy:Math.floor(100*Math.random())+10,cycles:0}}))}var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b(600,1e3,500),a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_ALGAE":return a.payload.algae;case"ADD_ALGAE":return[].concat(Object(c.a)(e),[a.payload.algae]);case"DELETE_ALGAE":return e.filter((function(e,t,n){return e.id!==a.payload.algae.id}));default:return e}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"ADD_MEASURE":var t=a.payload.measure;return[].concat(Object(c.a)(e.slice(Math.max(e.length-100,0))),[t]);case"RESET_MEASURE":return[];default:return e}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"ADD_SPECIES_COUNT":return[].concat(Object(c.a)(e.slice(Math.max(e.length-100,0))),[a.payload.species]);case"RESET_SPECIES_COUNT":return[];default:return e}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"PLAY",a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_CONTROL":return a.payload.control;default:return e}},v={ticks:0,bugs:0,algae:0,totalBugs:5,totalSpecies:5},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_TRACKER":return Object.assign({},a.payload.tracker);default:return e}},w={maxBugs:250,breedingCost:100,maxAlgae:1e3,algaeBreedThreshold:100,sampleInterval:100,mutationRate:10},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SET_PARAMETERS":return Object.assign({},a.payload.parameters);case"RESET_PARAMETERS":return Object.assign({},w);default:return e}},C=Object(o.b)({bugs:p,algae:E,measures:f,species:y,control:A,tracker:x,parameters:O}),S=Object(o.c)(C,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),j=(t(166),t(327)),k=t(145),B=t(24),T=t(26),M=t(138),R=t(306),N=t(320),D=t(325),I=t(85),P=t(326),L=t(330),U=t(324),W=t(332),z=t(323),H=t(322),Q=t(143),G=t.n(Q),V=t(144),X=t.n(V),Z=t(142),F=t.n(Z),K=t(140),J=t.n(K),_=t(141),Y=t.n(_),q=function(e){return{type:"SET_CONTROL",payload:{control:e}}},$=function(e){return e.parameters?e.parameters:{}},ee=function(e){return e.bugs?e.bugs:[]},ae=t(331),te=t(309),ne=Object(R.a)((function(e){return{root:{width:250,margin:20},margin:{height:e.spacing(3)},button:{margin:5}}})),re=[{value:400,label:"400"},{value:800,label:"800"},{value:1200,label:"1200"},{value:1600,label:"1600"},{value:2e3,label:"2000"}],le=[{value:50,label:"50"},{value:100,label:"100"},{value:150,label:"150"},{value:200,label:"200"},{value:250,label:"250"},{value:300,label:"300"},{value:350,label:"350"},{value:400,label:"400"},{value:450,label:"450"},{value:500,label:"500"}],ie=[{value:10,label:"10"},{value:20,label:"20"},{value:30,label:"30"},{value:40,label:"40"},{value:50,label:"50"},{value:60,label:"60"},{value:70,label:"70"},{value:80,label:"80"},{value:90,label:"90"},{value:100,label:"100"}];var oe=Object(i.b)((function(e){return{parameters:$(e)}}),{setParameters:function(e){return{type:"SET_PARAMETERS",payload:{parameters:e}}},resetParameters:function(){return{type:"RESET_PARAMETERS"}}})((function(e){var a=ne(),t=Object(n.useState)(e.parameters),l=Object(B.a)(t,2),i=l[0],o=l[1];return r.a.createElement("div",{className:a.root},r.a.createElement(I.a,{id:"max-bugs-slider",gutterBottom:!0},"Maximum Bug Population"),r.a.createElement(ae.a,{value:i.maxBugs,onChange:function(e,a){var t=Object.assign({},i);t.maxBugs=a,o(t)},"aria-labelledby":"max-bugs-slider",step:10,marks:le,min:50,max:300}),r.a.createElement("div",{className:a.margin}),r.a.createElement(I.a,{id:"bug-breed-cost-slider",gutterBottom:!0},"Bug Breeding Cost (Energy)"),r.a.createElement(ae.a,{value:i.breedingCost,onChange:function(e,a){var t=Object.assign({},i);t.breedingCost=a,o(t)},"aria-labelledby":"bug-breed-cost-slider",step:10,marks:le,min:0,max:300}),r.a.createElement("div",{className:a.margin}),r.a.createElement(I.a,{id:"max-algae-slider",gutterBottom:!0},"Maximum Algae Population"),r.a.createElement(ae.a,{value:i.maxAlgae,onChange:function(e,a){var t=Object.assign({},i);t.maxAlgae=a,o(t)},"aria-labelledby":"max-algae-slider",step:50,marks:re,min:400,max:2e3}),r.a.createElement("div",{className:a.margin}),r.a.createElement(I.a,{id:"algae-breed-threshold-slider",gutterBottom:!0},"Algae Breeding Threshold (Energy)"),r.a.createElement(ae.a,{value:i.algaeBreedThreshold,onChange:function(e,a){var t=Object.assign({},i);t.algaeBreedThreshold=a,o(t)},"aria-labelledby":"algae-breed-threshold-slider",step:10,marks:le,min:50,max:300}),r.a.createElement("div",{className:a.margin}),r.a.createElement(I.a,{id:"algae-mutation-rate-slider",gutterBottom:!0},"Mutation Chance (1 in n)"),r.a.createElement(ae.a,{value:i.mutationRate,onChange:function(e,a){var t=Object.assign({},i);t.mutationRate=a,o(t)},"aria-labelledby":"algae-mutation-rate-slider",step:1,marks:ie,min:10,max:100}),r.a.createElement("div",{className:a.margin}),r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.setParameters(i),e.toggle(!1)}},"Save"),r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.resetParameters(),o(e.parameters)}},"Reset"),r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.toggle(!1)}},"Close"))})),ce=t(310),se=t(311),ue=t(312),ge=t(128),de=t.n(ge),me=Object(R.a)({card:{maxWidth:"100%",maxHeight:500,margin:5,display:"flex",flexDirection:"row"},content:{width:"80%"},media:{margin:5,height:100,width:100}});var he=function(){var e=me();return r.a.createElement(ce.a,{className:e.card},r.a.createElement(se.a,{className:e.media,image:de.a,title:"Bugs 2020"}),r.a.createElement(ue.a,{className:e.content},r.a.createElement(I.a,{variant:"body1",color:"textSecondary",component:"p"},"Exploring machine learning and evolutionary adaptation by observing synthetic entities in a dynamic environment.")))},pe=Object(R.a)({card:{maxWidth:"100%",maxHeight:800,margin:5,display:"flex",flexDirection:"row"},content:{flex:"1 0 auto",margin:10,width:"90%"},media:{margin:5,height:100,width:100}});var be=function(){var e=pe();return r.a.createElement(ce.a,{className:e.card},r.a.createElement(ue.a,{className:e.content},r.a.createElement(I.a,{variant:"body1",color:"textSecondary",component:"p"},"The environment is a chaotic system, and the 'bugs' are selected by their ability to survive in this system. Those that can consume sufficient energy in the form of the green 'algae' or other 'bugs' will reproduce and persist. Those that do not die off. Population oscillations can be observed as selection pushes towards equilibrium. There are parameters that can be adjusted to experiment with the system. These can be adjusted as it is running."),r.a.createElement(I.a,{variant:"body1",color:"textSecondary",component:"p"},"'Bugs'"),r.a.createElement(I.a,{variant:"body2",color:"textSecondary",component:"p"},r.a.createElement("p",null,"Species is indicated by colour"),r.a.createElement("p",null,"A species is a unique set of parameter values"),r.a.createElement("p",null,"Burn energy when moving"),r.a.createElement("p",null,"The faster they move the more energy they burn"),r.a.createElement("p",null,"Eat both 'algae' and 'bugs' of other species (colour) in their paths"),r.a.createElement("p",null,"Can only eat smaller 'bugs'"),r.a.createElement("p",null,"Will not eat their own offspring, when mutated to another 'species'"),r.a.createElement("p",null,"Breed when they are large enough and have enough energy"),r.a.createElement("p",null,"Size and energy levels for breeding are a selected factor"),r.a.createElement("p",null,"When breeding there is a chance of a parameter change, forming a new species")),r.a.createElement(I.a,{variant:"body1",color:"textSecondary",component:"p"},"'Algae'"),r.a.createElement(I.a,{variant:"body2",color:"textSecondary",component:"p"},r.a.createElement("p",null,"Accumulate energy over time; 'photosynthesis'"),r.a.createElement("p",null,"Grow over time"),r.a.createElement("p",null,"The larger they are the more energy they can hold"),r.a.createElement("p",null,"Will create offspring when they reach a certain energy level"),r.a.createElement("p",null,"Offspring are spawned in a circle around the parent, when there is space")),r.a.createElement(I.a,{variant:"body2",color:"textSecondary",component:"p",align:"right"},"Kazan Glenn")))},Ee=t(146),fe=t(329),ye=t(321),Ae=t(63),ve=t(129),xe=t(21),we=t(14),Oe=t(22),Ce=t(31),Se=t(131),je=t.n(Se),ke=t(132),Be=(Object(Ce.PixiComponent)("Viewport",{create:function(e){var a=new ke.a({screenWidth:window.innerWidth,screenHeight:window.innerHeight,worldWidth:1e3,worldHeight:500});return console.log(e),a.drag().pinch().wheel().decelerate(),a},applyProps:function(e,a,t){console.log("applyProps")},didMount:function(){console.log("didMount")},willUnmount:function(){console.log("willUnmount")}}),t(5)),Te=t(52),Me=t.n(Te),Re=t(133),Ne=t.n(Re);function De(e,a){var t,n,r,l;return!1,e.centerX=e.x+e.width/2,e.centerY=e.y+e.height/2,a.centerX=a.x+a.width/2,a.centerY=a.y+a.height/2,e.halfWidth=e.width/2,e.halfHeight=e.height/2,a.halfWidth=a.width/2,a.halfHeight=a.height/2,r=e.centerX-a.centerX,l=e.centerY-a.centerY,t=e.halfWidth+a.halfWidth,n=e.halfHeight+a.halfHeight,Math.abs(r)<t&&Math.abs(l)<n}var Ie={ticks:0,bugs:0,algae:0,speciesCounts:{},totalBugs:10,totalSpecies:10},Pe=function(e){return r.a.createElement(Ce.Sprite,Object.assign({},e.bug,{image:Me.a,anchor:.5,overwriteProps:!0,ignoreEvents:!0,interactive:!0,pointerdown:function(){console.log(e.bug,e.handleOpen),e.handleOpen(e.bug)}}))},Le=function(e){return r.a.createElement(Ce.Sprite,Object.assign({},e,{image:Ne.a,anchor:.5,overwriteProps:!0,ignoreEvents:!0}))},Ue=r.a.createElement(Ce.Text,{text:"All Bugs Dead",anchor:0,x:380,y:250,style:new Be.TextStyle({fontSize:30,fontFamily:"Courier",fontWeight:"bold",fill:"#ff0000"})});function We(e){return function(){var a,t,n=window.innerWidth,r=window.innerHeight;r/n<.5?a=1e3*(t=r)/500:t=500*(a=n)/1e3,e.renderer&&(e.renderer.resize(a,t),e.stage.scale.set(a/1e3,t/500))}}var ze=Object(Ce.withPixiApp)(function(e){function a(){var e,t;Object(g.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=Object(xe.a)(this,(e=Object(we.a)(a)).call.apply(e,[this].concat(l)))).bounds=null,t.bugLogic=function(){t.props.bugs.forEach((function(e,a){0===e.energy&&(t.props.bugs.splice(a,1),Ie.speciesCounts[e.tint]?Ie.speciesCounts[e.tint]--:Ie.speciesCounts[e.tint]=0)})),t.props.bugs.forEach((function(e){if(t.props.bugs.length<t.props.parameters.maxBugs&&e.width>=e.breedSize&&e.energy>=e.breedThreshold){Ie.totalBugs++;var a=Object.assign({},t.evolve(e));a.energy=Math.floor(.25*e.energy),e.energy=Math.floor(.75*e.energy)-t.props.parameters.breedingCost,a.direction=Math.random()*Math.PI*2;var n=u()();e.geneology.children.push(n),a.geneology={id:n,parent:e.geneology.id,children:[]},a.cycles=0,a.width=5,a.height=10,t.props.bugs.push(a),Ie.speciesCounts[a.tint]?Ie.speciesCounts[a.tint]++:Ie.speciesCounts[a.tint]=1}t.props.bugs.forEach((function(a){a.geneology.id!==e.geneology.id&&e.tint!==a.tint&&e.geneology.id!==a.geneology.parent&&e.geneology.parent!==a.geneology.id&&De(e,a)&&(e.width>a.width?(e.energy+=a.energy,a.energy=0):e.width<a.width?(a.energy+=e.energy,e.energy=0):(e.direction+=.75*(Math.random()-.5),a.direction+=.75*(Math.random()-.5)))})),t.props.algae.forEach((function(a,n){De(e,a)&&(e.direction+=.75*(Math.random()-.5),e.energy+=a.energy,t.props.algae.splice(n,1))}));var r=e.brain.move(e.speed,e.direction,e.x,e.y,e.energy);e.direction=r.direction,e.speed=r.speed,e.x=e.x+Math.sin(e.direction)*(e.speed*e._s),e.y=e.y+Math.cos(e.direction)*(e.speed*e._s),e.rotation=-e.direction+Math.PI,e.x<t.bounds.x?e.x+=t.bounds.width:e.x>t.bounds.x+t.bounds.width&&(e.x-=t.bounds.width),e.y<t.bounds.y?e.y+=t.bounds.height:e.y>t.bounds.y+t.bounds.height&&(e.y-=t.bounds.height),e.energy=Math.max(0,e.energy-(2+Math.ceil(e.speed)))}))},t.evolve=function(e){var a=Object.assign({},e);if(0===Math.floor(Math.random()*t.props.parameters.mutationRate)){Ie.totalSpecies++,a.tint=e.tint+Math.round(65535*Math.random())-34952;var n=Math.floor(3*Math.random());switch(n){case 0:a.breedThreshold+=Math.floor(20*Math.random())-10;break;case 1:a.breedSize+=Math.min(22,Math.max(5,Math.floor(2*Math.random())-1));break;case 2:a.brain=new m;break;default:console.log("no change ...",n)}}return a},t.algaeLogic=function(){t.props.algae.forEach((function(e){if(e.cycles++,e.width<25&&e.cycles%75===0&&(e.width++,e.height++),e.energy>=t.props.parameters.algaeBreedThreshold&&t.props.algae.length<t.props.parameters.maxAlgae){var a=Object.assign({},e);a.width=5,a.height=5;var n=Math.random()*Math.PI*2,r=40*Math.random()+5;a.x+=Math.round(Math.cos(n)*r),a.y+=Math.round(Math.sin(n)*r),a.rotation=Math.random()*Math.PI*2,a.x<t.bounds.x?a.x+=t.bounds.width:a.x>t.bounds.x+t.bounds.width&&(a.x-=t.bounds.width),a.y<t.bounds.y?a.y+=t.bounds.height:a.y>t.bounds.y+t.bounds.height&&(a.y-=t.bounds.height);for(var l=!1,i=0;i<t.props.algae.length;i++)if(De(a,t.props.algae[i])){l=!0;break}l||(e.energy=Math.round(.9*e.energy),a.energy=Math.round(.1*e.energy),t.props.algae.push(a))}e.energy=Math.min(8*e.width,e.energy+1)}))},t.tick=function(){if(t.bugLogic(),t.algaeLogic(),t.props.setBugs(t.props.bugs.map((function(e,a){return e.cycles++,e.width<22&&e.cycles%100===0&&(e.width++,e.height+=2),e}))),0===t.props.bugs.length&&t.props.app.ticker.stop(),Ie.ticks++,Ie.ticks%t.props.parameters.sampleInterval===0){var e={cycle:Ie.ticks,bugs:t.props.bugs.length,algae:t.props.algae.length};t.props.addMeasure(e),Ie.bugs=t.props.bugs.length,Ie.algae=t.props.algae.length,t.props.setTracker(Ie),Object.entries(Ie.speciesCounts).forEach((function(e){var a=Object(B.a)(e,2),t=a[0];a[1];0!==Ie.speciesCounts[t]&&"undefined"!==t||delete Ie.speciesCounts[t]}));var a=Object.keys(Ie.speciesCounts).map((function(e){return{species:e,count:Ie.speciesCounts[e]}})),n={cycle:Ie.ticks,counts:a};t.props.addSpeciesCount(n)}},t.render=function(){var e=t.props.algae.map((function(e){return r.a.createElement(Le,e)})),a=t.props.bugs.map((function(e){return r.a.createElement(Pe,{bug:e,handleOpen:t.props.handleOpen})})),n="Cycle: ".concat(Ie.ticks).concat("\n Bugs: ").concat(t.props.bugs.length).concat("\nAlgae: ").concat(t.props.algae.length),l=r.a.createElement(Ce.Text,{text:n,anchor:0,x:5,y:450,style:new Be.TextStyle({fontSize:14,fontFamily:"Courier",fontWeight:"bold",fill:"#ffbf00"})});switch(t.props.control){case"PLAY":t.props.app.ticker.started||t.props.app.ticker.start();break;case"PAUSE":t.props.app.ticker.stop();break;case"RESET":t.props.app.ticker.stop(),t.props.setBugs(h(5,1e3,500)),t.props.setAlgae(b(600,1e3,500)),t.props.resetMeasure(),t.props.resetSpeciesCount(),Ie.ticks=0,Ie.totalBugs=5,Ie.totalSpecies=5,t.props.app.ticker.start(),t.props.setControl("PLAY");break;default:console.log("control not recognised ...")}return t.props.bugs.length>0?[].concat(Object(c.a)(e),Object(c.a)(a),[l]):[].concat(Object(c.a)(e),Object(c.a)(a),[l,Ue])},t}return Object(Oe.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){this.bounds=new Be.Rectangle(-10,-10,Number(1e3)+10,Number(500)+10),We(this.props.app,this.props.app.screen.width,this.props.app.screen.height)(),window.addEventListener("resize",We(this.props.app)),this.props.app.ticker.add(this.tick),console.log("engine props => ",this.props)}},{key:"componentWillUnmount",value:function(){this.props.app.ticker.remove(this.tick)}}]),a}(r.a.Component)),He={setBugs:function(e){return{type:"SET_BUGS",payload:{bugs:e}}},addBug:function(e){return{type:"ADD_BUG",payload:{bug:e}}},deleteBug:function(e){return{type:"DELETE_BUG",payload:{bug:e}}},setAlgae:function(e){return{type:"SET_ALGAE",payload:{algae:e}}},addAlgae:function(e){return{type:"ADD_ALGAE",payload:{algae:e}}},deleteAlgae:function(e){return{type:"DELETE_ALGAE",payload:{algae:e}}},addMeasure:function(e){return{type:"ADD_MEASURE",payload:{measure:e}}},resetMeasure:function(){return{type:"RESET_MEASURE"}},addSpeciesCount:function(e){return{type:"ADD_SPECIES_COUNT",payload:{species:e}}},resetSpeciesCount:function(){return{type:"RESET_SPECIES_COUNT"}},setControl:q,setTracker:function(e){return{type:"SET_TRACKER",payload:{tracker:e}}}},Qe=Object(i.b)((function(e){return{bugs:ee(e),algae:function(e){return e.algae?e.algae:[]}(e),control:function(e){return e.control?e.control:{}}(e),parameters:$(e)}}),He)(ze),Ge=t(328),Ve=t(80),Xe=t(314),Ze=t(315),Fe=t(317),Ke=t(313),Je=t(316),_e=t(148),Ye=t(333),qe=Object(R.a)((function(e){return{header:{display:"flex",padding:e.spacing(1),alignItems:"center",justifyContent:"center"},modal:{display:"flex",padding:e.spacing(1),alignItems:"center",justifyContent:"center"},paper:{width:400,backgroundColor:"#DDDDDD",border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}}));var $e=function(e){var a=qe(),t=Be.utils.premultiplyTintToRgba(null!==e.bug?e.bug.tint:0,.5),n=[597*t[0],597*t[1],597*t[2]],l="rgba("+n[0]+","+n[1]+","+n[2]+", 0.8)";return r.a.createElement(Ge.a,{disablePortal:!0,disableEnforceFocus:!0,disableAutoFocus:!0,open:e.open,onClose:e.handleClose,"aria-labelledby":"Bug","aria-describedby":"Bug details",className:a.modal},null!==e.bug?r.a.createElement("div",{className:a.paper},r.a.createElement("div",{className:a.header},r.a.createElement(Ye.a,{alt:"iamge of bug "+e.bug.geneology.id},r.a.createElement(Ve.ReactImageTint,{src:Me.a,color:l})),"\xa0",r.a.createElement(I.a,{variant:"body1",color:"primary",component:"p",align:"center"},e.bug.geneology.id)),r.a.createElement(Ke.a,{component:_e.a},r.a.createElement(Xe.a,{className:a.table,size:"small","aria-label":"bug-list"},r.a.createElement(Ze.a,null,r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Energy"),r.a.createElement(Fe.a,{align:"right"},e.bug.energy)),r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Cycles"),r.a.createElement(Fe.a,{align:"right"},e.bug.cycles)),r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Speed"),r.a.createElement(Fe.a,{align:"right"},e.bug.speed)),r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Breed Size"),r.a.createElement(Fe.a,{align:"right"},e.bug.breedSize)),r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Breed Threshold"),r.a.createElement(Fe.a,{align:"right"},e.bug.breedThreshold)),r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Offspring"),r.a.createElement(Fe.a,{align:"right"},e.bug.geneology.children.length)))))):r.a.createElement("div",null,r.a.createElement("p",null,"bug not specified")))},ea=Object(R.a)({card:function(e){return{maxWidth:e.width,maxHeight:e.height,backgroundImage:"url("+je.a+")",backgroundRepeat:"repeat-x",margin:5,display:"flex",flexDirection:"row"}}}),aa={properties:{position:!0,rotation:!0,scale:!1,uvs:!1,alpha:!1},listeners:[],onChange:function(e,a){this.listeners.forEach((function(t){return t(e,a)}))}},ta=function(e){function a(){var e,t;Object(g.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(t=Object(xe.a)(this,(e=Object(we.a)(a)).call.apply(e,[this].concat(r)))).state=Object(ve.a)({},aa.properties,{changed:!1}),t.onChange=function(e,a){var n;t.setState((n={},Object(Ae.a)(n,e,a),Object(Ae.a)(n,"changed",!0),n)),clearTimeout(t.changeTimeout),t.changeTimeout=setTimeout((function(){return t.setState({changed:!1})}),0)},t}return Object(Oe.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){aa.listeners.push(this.onChange)}},{key:"render",value:function(){return this.state.changed?null:this.props.children(this.state)}}]),a}(r.a.PureComponent);var na=function(e){var a=ea(e),t=r.a.useState(null),n=Object(B.a)(t,2),l=n[0],o=n[1],c=r.a.useState(!1),s=Object(B.a)(c,2),u=s[0],g=s[1],d=function(e){o(e),g(!0)};return r.a.createElement(ce.a,{className:a.card},r.a.createElement(Ce.Stage,{width:e.width,height:e.height,options:{transparent:!0}},r.a.createElement(i.a,{store:S},r.a.createElement(ta,null,(function(a){return r.a.createElement(Ce.Container,{properties:a},r.a.createElement(Qe,{config:e,handleOpen:d}))})))),r.a.createElement($e,{open:u,bug:l,handleClose:function(){g(!1)}}))},ra=t(84),la=Object(R.a)({card:function(e){return{maxWidth:"100%",minHeight:e.height,maxHeight:e.height,margin:5}}}),ia={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Cycle",fontColor:"rgb(63, 63, 191, 0.9)"},type:"linear",position:"bottom",ticks:{stepSize:100}}],yAxes:[{id:"bugs",scaleLabel:{display:!0,labelString:"# of Bugs",fontColor:"rgb(63, 63, 191, 0.9)"},position:"left"},{id:"algae",scaleLabel:{display:!0,labelString:"# of Algae",fontColor:"rgb(63, 63, 191, 0.9)"},position:"right"}]},legend:{display:!0,labels:{fontColor:"rgb(63, 63, 191, 0.9)"}},layout:{padding:{left:5,right:5,top:5,bottom:5}}};var oa=Object(i.b)((function(e){return{measures:function(e){return e.measures?e.measures:[]}(e)}}))((function(e){var a=la(e),t=e.measures,n={datasets:[{label:"Bugs",data:t&&t.length?t.map((function(e){return{x:e.cycle,y:e.bugs}})):[],yAxisID:"bugs",borderColor:"rgba(191, 63, 63, 0.5)",backgroundColor:"rgba(191, 63, 63, 0.3)",borderWidth:1,pointRadius:1,pointHoverRadius:1},{label:"Algae",data:t&&t.length?t.map((function(e){return{x:e.cycle,y:e.algae}})):[],yAxisID:"algae",borderColor:"rgba(0, 138, 0, 0.7)",backgroundColor:"rgba(0, 138, 0, 0.3)",borderWidth:1,pointRadius:1,pointHoverRadius:1}]};return r.a.createElement(ce.a,{className:a.card},r.a.createElement(ra.a,{data:n,options:ia}))})),ca=Object(R.a)({card:function(e){return{maxWidth:"100%",minHeight:e.height,maxHeight:e.height,margin:5}}}),sa={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Cycle",fontColor:"rgb(63, 63, 191, 0.9)"},type:"linear",position:"bottom",ticks:{stepSize:100}}],yAxes:[{scaleLabel:{display:!0,labelString:"# of Bugs",fontColor:"rgb(63, 63, 191, 0.9)"},position:"left"}]},legend:{display:!0,labels:{fontColor:"rgb(63, 63, 191, 0.9)"}},layout:{padding:{left:5,right:5,top:5,bottom:5}}};var ua=Object(i.b)((function(e){return{species:function(e){return e.species?e.species:[]}(e)}}))((function(e){var a=ca(e),t=[];e.species.forEach((function(e){e.counts.forEach((function(a){t[a.species]?t[a.species].push({x:e.cycle,y:a.count}):t[a.species]=[{x:e.cycle,y:a.count}]}))}));var n={datasets:Object.keys(t).map((function(e){var a=Be.utils.premultiplyTintToRgba(e,.5),n=[597*a[0],597*a[1],597*a[2]],r="rgba("+n[0]+","+n[1]+","+n[2]+", 0.9)",l="rgba("+n[0]+","+n[1]+","+n[2]+", 0.5)";return{label:e,data:t[e],borderColor:r,backgroundColor:l,borderWidth:1,pointRadius:1,pointHoverRadius:1,spanGaps:!1}}))};return r.a.createElement(ce.a,{className:a.card},r.a.createElement(ra.a,{data:n,options:sa}))})),ga=t(318),da=t(319),ma=Object(R.a)({card:{maxWidth:"100%",maxHeight:700,margin:5,display:"flex",flexDirection:"row"},media:{height:40,width:20}});var ha=Object(i.b)((function(e){return{bugs:ee(e)}}))((function(e){var a=e.bugs,t=ma(),n=r.a.useState(null),l=Object(B.a)(n,2),i=l[0],o=l[1],c=r.a.useState(!1),s=Object(B.a)(c,2),u=s[0],g=s[1];return r.a.createElement(ce.a,{className:t.card},r.a.createElement(Ke.a,{component:_e.a},r.a.createElement(Xe.a,{className:t.table,size:"small","aria-label":"bug-list"},r.a.createElement(ga.a,null,r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"left"},"Bug"),r.a.createElement(Fe.a,{align:"right"},"Species"),r.a.createElement(Fe.a,{align:"right"},"Age"),r.a.createElement(Fe.a,{align:"right"},"Energy"),r.a.createElement(Fe.a,{align:"right"},"Offspring"),r.a.createElement(Fe.a,{align:"right"},"Speed"),r.a.createElement(Fe.a,{align:"right"},"Width"),r.a.createElement(Fe.a,{align:"right"},"Breed Width"),r.a.createElement(Fe.a,{align:"right"},"Breed Energy"))),r.a.createElement(Ze.a,null,a.map((function(e,a){var n=Be.utils.premultiplyTintToRgba(e.tint,.5),l=[597*n[0],597*n[1],597*n[2]],i="rgba("+l[0]+","+l[1]+","+l[2]+", 0.8)";return r.a.createElement(Je.a,{key:a},r.a.createElement(Fe.a,{align:"left"},r.a.createElement(da.a,null,r.a.createElement(se.a,{className:t.media,title:"View bug "+e.geneology.id,onClick:function(){!function(e){o(e),g(!0)}(e)}},r.a.createElement(Ve.ReactImageTint,{src:Me.a,color:i})))),r.a.createElement(Fe.a,{align:"right"},e.tint),r.a.createElement(Fe.a,{align:"right"},e.cycles),r.a.createElement(Fe.a,{align:"right"},e.energy),r.a.createElement(Fe.a,{align:"right"},e.geneology.children.length),r.a.createElement(Fe.a,{align:"right"},e.speed),r.a.createElement(Fe.a,{align:"right"},e.width),r.a.createElement(Fe.a,{align:"right"},e.breedSize),r.a.createElement(Fe.a,{align:"right"},e.breedThreshold))}))))),r.a.createElement($e,{open:u,bug:i,handleClose:function(){g(!1)}}))})),pa=t(136),ba=t.n(pa),Ea=t(135),fa=t.n(Ea),ya=t(137),Aa=t.n(ya),va=Object(R.a)({card:{maxWidth:"100%",maxHeight:100,margin:5,display:"flex",flexDirection:"row"},button:{margin:5}}),xa="PAUSE",wa="PLAY",Oa="RESET";var Ca=Object(i.b)(null,{setControl:q})((function(e){var a=va();return r.a.createElement(ce.a,{className:a.card},r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.setControl(xa)}},r.a.createElement(fa.a,null)),r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.setControl(wa)}},r.a.createElement(ba.a,null)),r.a.createElement(te.a,{className:a.button,variant:"contained",onClick:function(){e.setControl(Oa)}},r.a.createElement(Aa.a,null)))})),Sa=Object(R.a)({card:{maxWidth:"100%",maxHeight:200,margin:5}});var ja=Object(i.b)((function(e){return{tracker:function(e){return e.tracker?e.tracker:{}}(e)}}))((function(e){var a=e.tracker,t=Sa();return r.a.createElement(ce.a,{className:t.card},r.a.createElement(Ke.a,{component:_e.a},r.a.createElement(Xe.a,{className:t.table,size:"small","aria-label":"tracker data"},r.a.createElement(ga.a,null,r.a.createElement(Je.a,null,r.a.createElement(Fe.a,{align:"right"},"Cycle"),r.a.createElement(Fe.a,{align:"right"},"Current Bugs"),r.a.createElement(Fe.a,{align:"right"},"Current Algae"),r.a.createElement(Fe.a,{align:"right"},"Total Bugs"),r.a.createElement(Fe.a,{align:"right"},"Total Species"))),r.a.createElement(Ze.a,null,r.a.createElement(Je.a,{key:a.ticks},r.a.createElement(Fe.a,{align:"right"},a.ticks),r.a.createElement(Fe.a,{align:"right"},a.bugs),r.a.createElement(Fe.a,{align:"right"},a.algae),r.a.createElement(Fe.a,{align:"right"},a.totalBugs),r.a.createElement(Fe.a,{align:"right"},a.totalSpecies))))))}));function ka(e){var a=e.children,t=e.value,n=e.index,l=Object(Ee.a)(e,["children","value","index"]);return r.a.createElement(I.a,Object.assign({component:"div",role:"tabpanel",hidden:t!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},l),t===n&&r.a.createElement("div",null,a))}function Ba(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var Ta=Object(R.a)((function(e){return{root:{flexGrow:1}}}));var Ma=function(){var e=Ta(),a=r.a.useState(0),t=Object(B.a)(a,2),n=t[0],l=t[1];return r.a.createElement("div",{className:e.root},r.a.createElement(N.a,{position:"static"},r.a.createElement(fe.a,{value:n,onChange:function(e,a){l(a)},"aria-label":"simple tabs example"},r.a.createElement(ye.a,Object.assign({label:"Simulation"},Ba(0))),r.a.createElement(ye.a,Object.assign({label:"Summary Chart"},Ba(1))),r.a.createElement(ye.a,Object.assign({label:"Species Chart"},Ba(2))),r.a.createElement(ye.a,Object.assign({label:"Bug List"},Ba(3))))),r.a.createElement(ka,{value:n,index:0},r.a.createElement(Ca,null),r.a.createElement(na,{width:"100%",height:500}),r.a.createElement(oa,{height:200}),r.a.createElement(ja,null)),r.a.createElement(ka,{value:n,index:1},r.a.createElement(oa,{height:400}),r.a.createElement(ja,null)),r.a.createElement(ka,{value:n,index:2},r.a.createElement(ua,{height:700})),r.a.createElement(ka,{value:n,index:3},r.a.createElement(ha,null)))},Ra=Object(R.a)((function(e){return{root:{flexGrow:1},offset:e.mixins.toolbar,menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},menu:{width:250}}}));var Na=function(){var e=Ra(),a=Object(n.useState)(!1),t=Object(B.a)(a,2),l=t[0],i=t[1],o=Object(n.useState)(!1),c=Object(B.a)(o,2),s=c[0],u=c[1],g=function(e){return function(a){("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&i(e)}},d=function(e){return function(a){("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&u(e)}},m=function(e){var a=e.icon,t=e.primary,n=e.to,l=r.a.useMemo((function(){return r.a.forwardRef((function(e,a){return r.a.createElement(M.a,Object.assign({to:n,ref:a},e))}))}),[n]);return r.a.createElement(W.a,{button:!0,component:l},a?r.a.createElement(H.a,null,a):null,r.a.createElement(z.a,{primary:t}))};return r.a.createElement(T.a,{initialEntries:["/simulation"],initialIndex:0},r.a.createElement("div",{className:e.root},r.a.createElement(N.a,{position:"fixed"},r.a.createElement(D.a,null,r.a.createElement(P.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",onClick:d(!0)},r.a.createElement(G.a,null)),r.a.createElement(I.a,{variant:"h6",className:e.title},"Bugs 2020"),r.a.createElement(P.a,{edge:"end",className:e.menuButton,color:"inherit","aria-label":"settings",onClick:g(!0)},r.a.createElement(X.a,null)))),r.a.createElement(L.a,{anchor:"left",open:s,onClose:d(!1)},r.a.createElement("div",{className:e.menu,role:"presentation",onClick:d(!1),onKeyDown:d(!1)},r.a.createElement(U.a,{component:"nav","aria-label":"navigation"},[{text:"Home",icon:r.a.createElement(J.a,null),href:"/"},{text:"Simulation",icon:r.a.createElement(Y.a,null),href:"/simulation"},{text:"About",icon:r.a.createElement(F.a,null),href:"/about"}].map((function(e,a){return r.a.createElement(m,{key:a,to:e.href,primary:e.text,icon:e.icon})}))))),r.a.createElement(L.a,{anchor:"right",open:l,onClose:g(!1)},r.a.createElement(oe,{toggle:g()}))),r.a.createElement(T.d,null,r.a.createElement(T.b,{exact:!0,path:"/"},r.a.createElement("div",{className:e.offset}),r.a.createElement(he,null)),r.a.createElement(T.b,{exact:!0,path:"/simulation"},r.a.createElement("div",{className:e.offset}),r.a.createElement(Ma,null)),r.a.createElement(T.b,{path:"/about"},r.a.createElement("div",{className:e.offset}),r.a.createElement(he,null),r.a.createElement(be,null))))},Da=Object(k.a)({palette:{type:"light"}});Object(l.render)(r.a.createElement(i.a,{store:S},r.a.createElement((function(){return r.a.createElement("div",{className:"App"},r.a.createElement(j.a,{theme:Da},r.a.createElement(Na,null)))}),null)),document.getElementById("root"))},52:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mSkVaHOwg6pChOlkQFXGUViyChdJWaNXB5NI/aNKQpLg4Cq4FB38Wqw4uzro6uAqC4A+Ik6OToouU+F1SaBHjHcc9vPe9L3ffAUKzylSzZxJQNctIJ2JiLr8qBl4hwI8QzRGJmXoys5iF5/i6h4/vd1Ge5V335wgpBZMBPpF4numGRbxBPLtp6Zz3icOsLCnE58QTBl2Q+JHrsstvnEsOCzwzbGTTceIwsVjqYrmLWdlQiWeII4qqUb6Qc1nhvMVZrdZZ+578hcGCtpLhOq1RJLCEJFIQIaOOCqqwEKVdI8VEms5jHv5hx58il0yuChg5FlCDCsnxg//B796axekpNykYA3pfbPtjDAjsAq2GbX8f23brBPA/A1dax19rAnOfpDc6WuQIGNgGLq47mrwHXO4AQ0+6ZEiO5KclFIvA+xl9Ux4YvAX619y+tc9x+gBkqVfLN8DBITBeoux1j3f3dfft35p2/34AGvJyhHk4EvcAAAAGYktHRABZABQAQk+9PdUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkAgMNGTCcdQVdAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAA3FJREFUOMuNlE9MI3UUx78zv44FjFiKbKCkJF1Mjexh2dl48A8BORJxOVUvEzkJp83GQPRgvFAOXkiJzRol4UJCMNEgIRABUzEVGnRTLMn+obFr2ABuagvTwbYzbWeeByg7RWr7Pf5+v/f5vt97Lw+4RD6fDwBemZube297e/vT5eXl2z09PeLk5CT+VxMTExgdHX03FAr9enJyotMzFeLxOC0uLv40PDzcWRJks9nQ1tYGAM/7/f4vZFl+SkQa/VdPiEhdX1//XZKkHgAcAGBwcPCKz+f7ZGdn50DXT01frKsjIvrKFHx8dvY9EVE+n1cDgcC+1+v9yOJ0Oq+5XK47ra2t9TzPAwDkdBoAPjQnenZ2CwClUikjk8k8zefzjwAARITp6elvotHoH1RBsiwfzs7OLhAR+vr6nll0d3fjy7t35yoBIpHIGoB+q9UKAOCLgGAw+Jzr6tXXUEE2m+262+1mDoej9KKzs/P1SCRSKQHKZrOFqampX4rm5xlIkvR+U1OTVimDmpoaJorijZGRkZslAIfD8ZbdbudRhURRZG63+3MAp33jOQae518mIguqk7Wjo+PtgYGBW6eOHIExpmUymZMqAdB1HV1dXW/wAGAYBjiOSySTSaHaeE3TIMvyX+d/VlX1nqIoVQEURckREcbGxkLngN3d3d8KhUJV9sfHx/F0Op0AcP8cMD4+HmKMVVXE+vp6ezKZfAJA4U1FEYiIqgE0NDTUGoaheb1emB0LhmFwVRbR4nQ6rw0NDTWbB6dOURQA0CtF5/N5jef5egBOM+BvIlLD4XCqEiAajfJnu4OZAQ/+fPz4h0QiYc9ms2WzKBQK+sHBgaCcprtdMvsPHj78jOM4xGKxsv08OjpSAWB/f3+6t7dXY+bLra2thCiKLkEQbjY2NuZqa2vZxQnc3Ny0chyHH9fWPpifn09eZvLCwsJCPBgMGhd3QSwWy6ysrJDf758vbmV2CSDX0tLyj8vlekdRlFRzc3NN8SIcDltUVc1JktQNIFsOAE3T7rW3t98QBOE6gJzdbuc2NjbUXC4n7O3tfb20tPRd8W3ZwZEk6SWPx3PfYrFcISKDMcanUqk9j8fzatG9ZCNd1MzMTKK/v/9NXdezjDGe4ziEQiGPObjsF8xdOzw8/FYUxcbV1dWPA4HAz/F4vOTBv5zvKdhA62boAAAAAElFTkSuQmCC"}},[[155,1,2]]]);
//# sourceMappingURL=main.6d95df8a.chunk.js.map