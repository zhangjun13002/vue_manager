webpackJsonp([0],{CL4D:function(e,s,a){"use strict";var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",[a("div",{staticClass:"layout-right-header"},[a("Breadcrumb",[a("Breadcrumb-item",[e._v(" 系统管理 ")]),e._v(" "),a("Breadcrumb-item",[e._v(" 用户管理 ")])],1)],1),e._v(" "),a("div",{staticClass:"layout-right-content"},[a("div",{staticClass:"content-main"},[a("div",{staticClass:"main-title"},[a("h2",[a("Icon",{attrs:{type:"android-people"}}),e._v("用户列表")],1)]),e._v(" "),a("div",{staticClass:"split"}),e._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("Button",{attrs:{type:"primary",size:"small"},on:{click:e.getUsers}},[e._v("刷新")]),e._v(" "),a("Button",{attrs:{type:"primary",size:"small"},on:{click:function(s){e.modal1=!0}}},[e._v("添加")]),e._v(" "),a("Modal",{attrs:{title:"添加用户",loading:e.loading,"mask-closable":!1},on:{"on-ok":e.addUser,"on-cancel":e.addCancel},model:{value:e.modal1,callback:function(s){e.modal1=s},expression:"modal1"}},[a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                用户:\n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Input",{on:{"on-change":e.userCheck},model:{value:e.m1_username,callback:function(s){e.m1_username=s},expression:"m1_username"}})],1)],1),e._v(" "),a("br"),e._v(" "),a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                密码: \n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Input",{attrs:{type:"text"},model:{value:e.m1_password,callback:function(s){e.m1_password=s},expression:"m1_password"}})],1)],1),e._v(" "),a("br"),e._v(" "),a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                角色: \n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Select",{attrs:{multiple:""},model:{value:e.m1_roles,callback:function(s){e.m1_roles=s},expression:"m1_roles"}},e._l(e.roleslist,function(s){return a("Option",{key:s.value,attrs:{value:s.value}},[e._v(e._s(s.label))])}))],1)],1)],1),e._v(" "),a("Button",{attrs:{type:"primary",size:"small"},on:{click:function(s){e.modal2=!0}}},[e._v("修改")]),e._v(" "),a("Modal",{attrs:{title:"修改密码","mask-closable":!1},on:{"on-ok":e.updateUser,"on-cancel":e.updateCancel},model:{value:e.modal2,callback:function(s){e.modal2=s},expression:"modal2"}},[a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                用户:\n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Input",{attrs:{disabled:""},model:{value:e.m2_username,callback:function(s){e.m2_username=s},expression:"m2_username"}})],1)],1),e._v(" "),a("br"),e._v(" "),a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                密码: \n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Input",{attrs:{type:"text"},on:{"on-change":e.m2Change},model:{value:e.m2_password,callback:function(s){e.m2_password=s},expression:"m2_password"}})],1)],1),e._v(" "),a("br"),e._v(" "),a("Row",[a("Col",{attrs:{span:"2"}},[e._v("\n                                角色: \n                              ")]),e._v(" "),a("Col",{attrs:{span:"22"}},[a("Select",{attrs:{multiple:""},model:{value:e.m2_roles,callback:function(s){e.m2_roles=s},expression:"m2_roles"}},e._l(e.roleslist,function(s){return a("Option",{key:s.value,attrs:{value:s.value}},[e._v(e._s(s.label))])}))],1)],1)],1),e._v(" "),a("Button",{attrs:{type:"warning",size:"small"},on:{click:e.delUser}},[e._v("删除")])],1)],1),e._v(" "),a("br"),e._v(" "),a("Row",{attrs:{type:"flex"}},[a("Col",{attrs:{span:"24"}},[a("Table",{attrs:{border:"",draggable:"",stripe:"","highlight-row":"",size:"small",columns:e.columns1,data:e.data1},on:{"on-select":e.getSelKey}})],1)],1)],1)])])},n=[],r={render:t,staticRenderFns:n};s.a=r},X43W:function(e,s,a){var t=a("ucUj");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("rjj0")("4f23479e",t,!0)},mvHQ:function(e,s,a){e.exports={default:a("qkKv"),__esModule:!0}},nirs:function(e,s,a){"use strict";function t(e){a("X43W")}Object.defineProperty(s,"__esModule",{value:!0});var n=a("tIvv"),r=a("CL4D"),o=a("VU/8"),l=t,i=o(n.a,r.a,!1,l,null,null);s.default=i.exports},qkKv:function(e,s,a){var t=a("FeBl"),n=t.JSON||(t.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},tIvv:function(e,s,a){"use strict";var t=a("mvHQ"),n=a.n(t),r=a("Av7u"),o=a.n(r);s.a={data:function(){var e=this;return{data1:[],columns1:[{type:"selection",width:40,align:"center"},{title:"用户",key:"username",align:"center"},{title:"密码",key:"password",align:"center",render:function(s,a){return s("span",e.hidePass(a.row.password))}},{title:"角色",key:"roles",align:"center",render:function(e,s){return e("span",s.row.roles.join(","))}},{title:"登录时间",key:"logintime",align:"center"},{title:"创建时间",key:"gentime",align:"center"}],modal1:!1,loading:!0,m1_username:"",m1_password:"",m1_roles:[],usercheck:!1,modal2:!1,m2_username:"",m2_password:"",m2_roles:[],oldPassword:"",isM2change:!1,roleslist:[]}},methods:{userCheck:function(){var e=this,s=e.data1.every(function(s){return s.username!==e.m1_username});""!==e.m1_username&&s?e.usercheck=!0:e.usercheck=!1,e.usercheck?e.loading=!1:e.loading=!0},addUser:function(){var e=this;if(e.usercheck){var s={};s.username=e.m1_username,s.password=o.a.MD5(e.m1_password).toString(),s.roles=e.m1_roles,s.gentime=e.$moment().format("YYYY-MM-DD HH:mm:ss"),e.saveUsers(s,"insert"),e.data1.push(s),e.m1_username="",e.m1_password="",e.m1_roles=[],e.usercheck=!1,e.loading=!1}else e.loading=!0},addCancel:function(){var e=this;e.m1_username="",e.m1_password="",e.m1_roles=[]},updateUser:function(){var e=this,s={};s.username=e.m2_username,e.isM2change?(s.password=o.a.MD5(e.m2_password).toString(),e.isM2change=!1):s.password=e.oldPassword,s.roles=e.m2_roles,e.saveUsers(s,"update");var a=Array();e.data1.forEach(function(e){e.username===s.username?(e.password=s.password,e.roles=s.roles,a.push(e)):a.push(e)}),e.data1=a,e.m2_username="",e.m2_password="",e.m2_roles=[]},updateCancel:function(){var e=this;e.m2_username="",e.m2_password="",e.m2_roles=[]},delUser:function(){var e=this,s={};s.username=e.m2_username,e.saveUsers(s,"delete"),e.data1=e.data1.filter(function(e){return e.username!==s.username})},saveUsers:function(e,s){var a=this,t=new Object;t.data=n()(e),t.method=s,a.$http.post("/user/save",t).then(function(e){return e.status},function(e){return e.status})},getUsers:function(){var e=this;e.data1=[];var s=new Object;s.user="all",e.$http.post("/user/info",s).then(function(s){var a=s.body;e.data1=a.data},function(e){return e.status})},getSelKey:function(e,s){var a=this;a.m2_username=s.username,a.m2_password=a.hidePass(s.password),a.oldPassword=s.password,a.m2_roles=s.roles},hidePass:function(e){var s=o.a.enc.Base64.stringify(o.a.enc.Utf8.parse(e)),a=s.length;return s.slice(0,2)+"****"+s.slice(a-3,a-1)},m2Change:function(){this.isM2change=!0}},mounted:function(){var e=this,s=this;s.getUsers(),s.$store.dispatch("SetRoleslist").then(function(a){var t=e.$store.getters.roleslist,n=[];t.forEach(function(e){var s=new Object;s.value=e.name,s.label=e.name,n.push(s)}),s.roleslist=n})}}},ucUj:function(e,s,a){s=e.exports=a("FZ+f")(!0),s.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"user.vue",sourceRoot:""}])}});