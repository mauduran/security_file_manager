(this.webpackJsonpfirma_docs_web=this.webpackJsonpfirma_docs_web||[]).push([[0],{30:function(e,t,a){e.exports=a(64)},35:function(e,t,a){},36:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(27),l=a.n(c),s=(a(35),a(1)),o=a(11),u=(a(36),function(e){var t=e.setisLogged,a=e.isLogged,n=e.currentUser;return r.a.createElement("nav",{id:"navbar"},r.a.createElement("h1",{id:"nav-title"},"TLS Website"),r.a.createElement("ul",null,r.a.createElement(o.b,{exact:!0,to:"/",activeClassName:"selected"},r.a.createElement("li",null,r.a.createElement("p",null,"Home"))),r.a.createElement(o.b,{to:"/login",activeClassName:"selected"},r.a.createElement("li",null,r.a.createElement("p",null,"Login"))),r.a.createElement(o.b,{to:"/register",activeClassName:"selected"},r.a.createElement("li",null,r.a.createElement("p",null,"Register"))),r.a.createElement(o.b,{to:"/upload",activeClassName:"selected"},r.a.createElement("li",null,r.a.createElement("p",null,"Upload")))),a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Logged in as ",n),r.a.createElement("p",{onClick:function(){t(!1),localStorage.removeItem("user")},style:{cursor:"pointer"}},"Logout")))}),i=a(9),m=a.n(i),p=a(29),f=a.n(p),d=(a(59),function(e){var t=e.fileName,a=e.setmessage;return r.a.createElement("div",{className:"file-box"},r.a.createElement("i",{className:"fas fa-file-alt",onClick:function(){fetch("/download/".concat(t)).then((function(e){return e.blob()})).then((function(e){f()(e,t)})).catch((function(e){return alert(e)}))}}),r.a.createElement("p",null,t),r.a.createElement("a",{href:"/signatures/".concat(t)},"Check signature."),r.a.createElement("button",{type:"button",className:"btn btn-primary pl-4 pr-4 mt-2",onClick:function(){fetch("/verify/".concat(t)).then((function(e){return e.json()})).then((function(e){a("".concat(t,e?" verified successfully!":" is not verified!"))})).catch((function(e){return a("Could not verify ".concat(t))}))}},"Verify"))}),b=function(e){var t=e.message,a=e.onClick;return r.a.createElement("div",{className:"alert alert-info alert-dismissible fade show",role:"alert"},t,r.a.createElement("button",{type:"button",className:"close","data-dismiss":"alert",onClick:a,"aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")))};a(60);function E(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),o=Object(s.a)(l,2),u=o[0],i=o[1];return Object(n.useEffect)((function(){m.a.get("/files").then((function(e){c(e.data)}))}),[]),r.a.createElement("div",{className:"mt-4",style:{width:"90%",margin:"0 auto"}},u&&r.a.createElement(b,{message:u}),r.a.createElement("h1",{className:"m-4"},"Existing Files"),a?r.a.createElement("div",{className:"file-container"},a.map((function(e){return r.a.createElement(d,{key:e,fileName:e,setmessage:i})}))):r.a.createElement("h2",null,"Empty directory"))}var g=a(7),v=a.n(g),h=a(10);a(62);function N(e){var t=e.setisLogged,a=e.setcurrentUser,c=Object(n.useState)(""),l=Object(s.a)(c,2),o=l[0],u=l[1],i=Object(n.useState)(""),p=Object(s.a)(i,2),f=p[0],d=p[1],E=Object(n.useState)(""),g=Object(s.a)(E,2),N=g[0],j=g[1],O=Object(n.useState)(!1),y=Object(s.a)(O,2),w=y[0],C=y[1],S=Object(n.useState)(""),k=Object(s.a)(S,2),x=k[0],q=k[1],F=function(){var e=Object(h.a)(v.a.mark((function e(t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),o&&f||j("Missing Fields"),e.prev=2,e.next=5,m.a.post("/login",{username:o,password:f});case 5:a=e.sent,C(!0),u(a.data.username),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),j(e.t0.response.data);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(h.a)(v.a.mark((function e(){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,m.a.post("/login/verify",{username:o,token:x});case 5:n=e.sent,localStorage.setItem("user",o),j(n.data.message),a(o),C(!1),t(!0),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),j(e.t0.response.data);case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container mt-5"},N&&r.a.createElement(b,{message:N,onClick:function(){return j("")}}),w?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"form-group "},r.a.createElement("input",{type:"text",className:"form-control",value:x,onChange:function(e){return q(e.target.value)},placeholder:"Two Factor Auth code"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary",onClick:L},"Verify Code"))):r.a.createElement("div",{className:"login-container"},r.a.createElement("form",{onSubmit:F,className:"login-form",method:"post"},r.a.createElement("h2",{className:"text-center mb-4"},"Log In"),r.a.createElement("div",{className:"form-group "},r.a.createElement("input",{type:"text",className:"form-control",value:o,onChange:function(e){return u(e.target.value)},placeholder:"Username",required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",onChange:function(e){return d(e.target.value)},value:f,className:"form-control",placeholder:"Password",required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Log in")))))}a(63);function j(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(""),o=Object(s.a)(l,2),u=o[0],i=o[1],p=Object(n.useState)(""),f=Object(s.a)(p,2),d=f[0],E=f[1],g=Object(n.useState)(""),N=Object(s.a)(g,2),j=N[0],O=N[1],y=Object(n.useState)(""),w=Object(s.a)(y,2),C=w[0],S=w[1],k=Object(n.useState)(""),x=Object(s.a)(k,2),q=x[0],F=x[1],L=function(){var e=Object(h.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a&&u&&d&&j||S("Missing Fields"),d!==j&&S("Passwords do not match"),e.prev=3,e.next=6,m.a.post("/register",{name:a,username:u,password:d});case 6:n=e.sent,console.log(n.data),S(n.data.message),F(n.data.qr),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),S(e.t0.response.data);case 15:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container mt-3"},C&&r.a.createElement(b,{message:C,onClick:function(){return S("")}}),q?r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Scan qr in google authenticator"),r.a.createElement("img",{src:q,style:{margin:"0 auto"},alt:"qrcode"})):r.a.createElement("div",{className:"register-container mt-5"},r.a.createElement("div",{className:"login-form"},r.a.createElement("form",{onSubmit:L},r.a.createElement("h2",{className:"text-center mb-4"},"Register"),r.a.createElement("div",{className:"form-group "},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Name",value:a,onChange:function(e){return c(e.target.value)},required:"required"})),r.a.createElement("div",{className:"form-group "},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Username",value:u,onChange:function(e){return i(e.target.value)},required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Password",value:d,onChange:function(e){return E(e.target.value)},required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Confirm password",value:j,onChange:function(e){return O(e.target.value)},required:"required"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Sign Up"))))))}var O=a(2),y=function(e){var t=e.percentage;return r.a.createElement("div",{className:"progress"},r.a.createElement("div",{className:"progress-bar progress-bar-striped bg-success",role:"progressbar",style:{width:"".concat(t,"%")},"aria-valuenow":t,"aria-valuemin":"0","aria-valuemax":"100"},t,"%"))},w=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)("Choose File"),o=Object(s.a)(l,2),u=o[0],i=o[1],p=Object(n.useState)(0),f=Object(s.a)(p,2),d=f[0],E=f[1],g=Object(n.useState)(""),N=Object(s.a)(g,2),j=N[0],O=N[1],w=function(){var e=Object(h.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.target.files[0]||O("No File Added."),c(t.target.files[0]),i(t.target.files[0].name);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(h.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),(n=new FormData).append("file",a),e.prev=3,e.next=6,m.a.post("/upload",n,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){E(parseInt(Math.round(100*e.loaded/e.total)))}});case 6:setTimeout((function(){return E(0)}),1e4),O("File Uploaded!"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),500===e.t0.response.status?O("There was a problem with the server"):O(e.t0.response.data.msg);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(n.Fragment,null,j&&r.a.createElement(b,{message:j,onClick:function(){return O("")}}),r.a.createElement("form",{onSubmit:C},r.a.createElement("div",{className:"custom-file mt-4 mb-4"},r.a.createElement("input",{type:"file",className:"custom-file-input",id:"customFile",onChange:w}),r.a.createElement("label",{className:"custom-file-label",htmlFor:"customFile"},u)),r.a.createElement(y,{percentage:d}),r.a.createElement("input",{type:"submit",value:"upload",className:"btn btn-primary btn-block mt-4"})))};function C(){return r.a.createElement("div",{className:"container mt-4"},r.a.createElement("h1",null,"Upload file"),r.a.createElement(w,null))}var S=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(null),i=Object(s.a)(l,2),m=i[0],p=i[1];return Object(n.useEffect)((function(){var e=localStorage.getItem("user");e&&(c(!0),p(e))}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(o.a,null,r.a.createElement(u,{currentUser:m,isLogged:a,setisLogged:c}),r.a.createElement(O.d,null,r.a.createElement(O.b,{exact:!0,path:"/"},a?r.a.createElement(E,null):r.a.createElement(O.a,{to:"/login"})),r.a.createElement(O.b,{exact:!0,path:"/login"},a?r.a.createElement(O.a,{to:"/"}):r.a.createElement(N,{setisLogged:c,setcurrentUser:p})),r.a.createElement(O.b,{path:"/register"},a?r.a.createElement(O.a,{to:"/"}):r.a.createElement(j,null)),r.a.createElement(O.b,{path:"/upload"},a?r.a.createElement(C,null):r.a.createElement(O.a,{to:"/login"})))))};l.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.59f081e6.chunk.js.map