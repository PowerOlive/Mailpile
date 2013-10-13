// If no console.log() exists
function MailPile(){this.msgcache=[];this.searchcache=[];this.keybindings=[];this.commands=[];this.graphselected=[]}window.console||(window.console={log:$.noop,group:$.noop,groupEnd:$.noop,info:$.noop,error:$.noop});Number.prototype.pad=function(e){typeof e!="number"&&(e=2);var t=String(this);while(t.length<e)t="0"+t;return t};MailPile.prototype.keybindings_loadfromserver=function(){var e=this;this.json_get("help",{},function(e){console.log(e);for(key in e[0].result.commands)console.log(key)})};MailPile.prototype.add=function(){};MailPile.prototype.attach=function(){};MailPile.prototype.compose=function(){};MailPile.prototype.delete=function(){};MailPile.prototype.extract=function(){};MailPile.prototype.filter=function(){};MailPile.prototype.help=function(){};MailPile.prototype.load=function(){};MailPile.prototype.mail=function(){};MailPile.prototype.forward=function(){};MailPile.prototype.next=function(){};MailPile.prototype.order=function(){};MailPile.prototype.optimize=function(){};MailPile.prototype.previous=function(){};MailPile.prototype.print=function(){};MailPile.prototype.reply=function(){};MailPile.prototype.rescan=function(){};MailPile.prototype.compose=function(){var e=$('<form action="'+url+'" method="post">'+'<input type="text" name="api_url" value="'+Return_URL+'" />'+"</form>");$("body").append(e);$(e).submit();console.log("yo here we go");$("#compose-to, #compose-cc, #compose-bcc").select2("val","");$("#compose-subject").val("");$("#compose-body").val("");$("#compose-attachments-list").html("")};MailPile.prototype.gpgrecvkey=function(e){console.log("Fetching GPG key 0x"+e);mailpile.json_get("gpg recv_key",{},function(t){console.log("Fetch command execed for GPG key 0x"+e+", resulting in:");console.log(t)})};MailPile.prototype.gpglistkeys=function(){mailpile.json_get("gpg list",{},function(e){$("#content").append('<div class="dialog" id="gpgkeylist"></div>');for(k in e.results){key=e.results[k];$("#gpgkeylist").append("<li>Key: "+key.uids[0].replace("<","&lt;").replace(">","&gt;")+": "+key.pub.keyid+"</li>")}})};MailPile.prototype.search=function(e){var t=this;$("#qbox").val(e);this.json_get("search",{q:e},function(e){$("#results").length==0&&$("#content").prepend('<table id="results" class="results"><tbody></tbody></table>');$("#results tbody").empty();for(var n=0;n<e.results.length;n++){msg_info=e.results[n];msg_tags=e.results[n].tags;d=new Date(msg_info.date*1e3);zpymd=d.getFullYear()+"-"+(d.getMonth()+1).pad(2)+"-"+d.getDate().pad(2);ymd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();taghrefs=msg_tags.map(function(e){return"<a onclick=\"mailpile.search('\\"+e+"')\">"+e+"</a>"}).join(" ");tr=$('<tr class="result"></tr>');tr.addClass(n%2==0?"even":"odd");tr.append('<td class="checkbox"><input type="checkbox" name="msg_'+msg_info.id+'"/></td>');tr.append('<td class="from"><a href="'+msg_info.url+'">'+msg_info.from+"</a></td>");tr.append('<td class="subject"><a href="'+msg_info.url+'">'+msg_info.subject+"</a></td>");tr.append('<td class="tags">'+taghrefs+"</td>");tr.append('<td class="date"><a onclick="mailpile.search(\'date:'+ymd+"');\">"+zpymd+"</a></td>");$("#results tbody").append(tr)}t.loglines(e.chatter)})};MailPile.prototype.go=function(e){console.log("Going to ",e);window.location.href=e};MailPile.prototype.set=function(e,t){var n=this;this.json_get("set",{args:e+"="+t},function(e){e.status=="ok"?n.notice("Success: "+e.loglines[0]):e.status=="error"&&this.error(e.loglines[0])})};MailPile.prototype.tag=function(e,t){};MailPile.prototype.addtag=function(e){};MailPile.prototype.unset=function(){};MailPile.prototype.update=function(){};MailPile.prototype.view=function(e,t){var n=this;this.json_get("view",{idx:e,msgid:t},function(e){$("#results").length==0&&$("#content").prepend('<table id="results" class="results"><tbody></tbody></table>');$("#results").empty();$that.loglines(e.chatter)})};MailPile.prototype.json_get=function(e,t,n){var r;e=="view"?r="/="+t.idx+"/"+t.msgid+".json":r="/_/"+e+".json";$.getJSON(r,t,n)};MailPile.prototype.loglines=function(e){$("#loglines").empty();for(var t=0;t<e.length;t++)$("#loglines").append(e[t]+"\n")};MailPile.prototype.notice=function(e){console.log("NOTICE: "+e)};MailPile.prototype.error=function(e){console.log("ERROR: "+e)};MailPile.prototype.warning=function(e){console.log("WARNING: "+e)};MailPile.prototype.results_list=function(){$("#btn-display-list").addClass("navigation-on");$("#btn-display-graph").removeClass("navigation-on");$("#pile-graph").hide();$("#pile-results").show()};MailPile.prototype.graph_actionbuttons=function(){this.graphselected.length>=1?$("#btn-compose-message").show():$("#btn-compose-message").hide();this.graphselected.length>=2?$("#btn-found-group").show():$("#btn-found-group").hide()};MailPile.prototype.focus_search=function(){$("#qbox").focus();return!1};MailPile.prototype.results_graph=function(e){$("#btn-display-graph").addClass("navigation-on");$("#btn-display-list").removeClass("navigation-on");$("#pile-results").hide();$("#pile-graph").show();d3.json("/_/shownetwork.json?args="+e,function(e,t){t=t[0].result;console.log(t);var n=640,r=640,i=d3.layout.force().charge(-300).linkDistance(75).size([n,r]),s=d3.select("#pile-graph-canvas-svg");$("#pile-graph-canvas-svg").empty();var o=d3.scale.category20(),u=d3.select("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").text("a simple tooltip");i.nodes(t.nodes).links(t.links).start();var a=s.selectAll(".link").data(t.links).enter().append("line").attr("class","link").style("stroke-width",function(e){return Math.sqrt(3*e.value)}),f=s.selectAll(".node").data(t.nodes).enter().append("g").attr("class","node").call(i.drag);f.append("circle").attr("r",8).style("fill",function(e){return o("#3a6b8c")});f.append("text").attr("x",12).attr("dy","0.35em").style("opacity","0.3").text(function(e){return e.email});a.append("text").attr("x",12).attr("dy",".35em").text(function(e){return e.type});f.on("click",function(e,t,n){if(mailpile.graphselected.indexOf(e.email)<0){d3.select(f[n][t]).selectAll("circle").style("fill","#4b7945");mailpile.graphselected.push(e.email)}else{mailpile.graphselected.pop(e.email);d3.select(f[n][t]).selectAll("circle").style("fill","#3a6b8c")}mailpile.graph_actionbuttons()});f.on("mouseover",function(e,t,n){d3.select(f[n][t]).selectAll("text").style("opacity","1")});f.on("mouseout",function(e,t,n){d3.select(f[n][t]).selectAll("text").style("opacity","0.3")});i.on("tick",function(){a.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y});f.attr("transform",function(e){return"translate("+e.x+","+e.y+")"})})})};var keybindings=[["/","normal",function(){$("#qbox").focus();return!1}],["C","normal",function(){mailpile.go("/_/compose/")}],["g i","normal",function(){mailpile.go("/Inbox/")}],["g c","normal",function(){mailpile.go("/_/contact/list/")}],["g n c","normal",function(){mailpile.go("/_/contact/add/")}],["g n m","normal",function(){mailpile.go("/_/compose/")}],["g t","normal",function(){$("#dialog_tag").show();$("#dialog_tag_input").focus();return!1}],["esc","global",function(){$("#dialog_tag_input").blur();$("#qbox").blur();$("#dialog_tag").hide()}]],mailpile=new MailPile,statusHeaderPadding=function(){if($("#header").css("position")==="fixed")var e=$("#header").height()+50;else var e=0;return e},statusMessage=function(e,t,n,r){var i={success:"Success, we did exactly what you asked.",info:"Here is a basic info update",debug:"What kind of bug is this bug, it's a debug",warning:"This here be a warnin to you, just a warnin mind you",error:"Whoa cowboy, you've mozyed on over to an error"},s=$("#messages").find("div."+e);t==undefined&&(t=i[e]);s.find("span.message-text").html(t),s.fadeIn(function(){$("#header").css("padding-top",statusHeaderPadding())});n!=undefined&&(n=="hide"?s.delay(5e3).fadeOut("normal",function(){s.find("span.message-text").empty()}):options.complete=="redirect"&&setTimeout(function(){window.location.href=r},5e3));return!1};$(document).ready(function(){$(".message-close").on("click",function(){$(this).parent().fadeOut(function(){$("#header").css("padding-top",statusHeaderPadding())})});$(".button-sub-navigation").on("click",function(){var e=$(this).data("filter");$("#sub-navigation ul.left li").removeClass("navigation-on");if(e=="in_new"){$("#display-new").addClass("navigation-on");$("tr").hide("fast",function(){$("tr.in_new").show("fast")})}else if(e=="in_later"){$("#display-later").addClass("navigation-on");$("tr").hide("fast",function(){$("tr.in_later").show("fast")})}else{$("#display-all").addClass("navigation-on");$("tr.result").show("fast")}return!1});$("#search-params, #bulk-actions").hide();$("#qbox").bind("focus",function(e){$("#search-params").slideDown("fast")});$("#qbox").bind("blur",function(e){$("#search-params").slideUp("fast")});for(item in keybindings)item[1]=="global"?Mousetrap.bindGlobal(item[0],item[2]):Mousetrap.bind(item[0],item[2]);$(".bulk-action").on("click",function(e){e.preventDefault();var t=$("#pile-results input[type=checkbox]"),n=$(this).attr("href"),r=0;$.each(t,function(){if($(this).val()==="selected"){console.log("This is here "+$(this).attr("name"));r++}});alert(r+' items selected to "'+n.replace("#","")+'"')});var e=function(e){$("#bulk-actions-selected-count").html(parseInt($("#bulk-actions-selected-count").html())+1);$("#bulk-actions").slideDown("fast");e.removeClass("result").addClass("result-on").data("state","selected").find("td.checkbox input[type=checkbox]").val("selected").prop("checked",!0)},t=function(e){var t=parseInt($("#bulk-actions-selected-count").html())-1;$("#bulk-actions-selected-count").html(t);t<1&&$("#bulk-actions").slideUp("fast");e.removeClass("result-on").addClass("result").data("state","normal").find("td.checkbox input[type=checkbox]").val("normal").prop("checked",!1)};$("#pile-results").on("click","tr",function(n){n.target.href===undefined&&$(this).data("state")==="selected"?t($(this)):n.target.href===undefined&&e($(this))});$("td.draggable").draggable({containment:"#container",scroll:!1,revert:!0,helper:function(e){var t=parseInt($("#bulk-actions-selected-count").html());t==0?drag_count="1 message</div>":drag_count=t+" messages";return $('<div class="pile-results-drag ui-widget-header"><span class="icon-message"></span> Move '+drag_count+" to</div>")}});$("li.sidebar-tags").droppable({accept:"#pile-results td.draggable",activeClass:"sidebar-tags-drag-hover",hoverClass:"sidebar-tags-drag-active",drop:function(e,t){var n=$(this).html();$(this).addClass("sidebar-tags-drag-highlight").html("Moved :)")}});$(document).on("click","#button-compose",function(){$.ajax({url:"/api/0/message/compose/",type:"POST",data:{},dataType:"json"}).done(function(e){e.status=="success"?window.location.href="/message/draft/="+e.result.created+"/":statusMessage(e.status,e.message)})});$("#form-compose").length&&$.getJSON("http://localhost:33411/static/contacts.json",function(e){var t=function(e){return e.id?"<span class='icon-user'></span> &nbsp;"+e.text:e.text};$("#compose-to, #compose-cc, #compose-bcc").select2({tags:e[0].result.contacts,multiple:!0,allowClear:!0,placeholder:"type name or email address",width:"94%",maximumSelectionSize:50,tokenSeparators:[","," - "],formatResult:t,formatSelection:t,formatSelectionTooBig:function(){return'You\'ve added the maximum contacts allowed, to increase this go to <a href="#">settings</a>'}});$("#compose-to, #compose-cc, #compose-bcc").on("change",function(){$("#compose-to_val").html($("#compose-to").val())});$("#compose-to, #compose-cc, #compose-bcc").select2("container").find("ul.select2-choices").sortable({containment:"parent",start:function(){$("#compose-to, #compose-cc, #compose-bcc").select2("onSortStart")},update:function(){$("#compose-to, #compose-cc, #compose-bcc").select2("onSortEnd")}})})});$(document).on("click",".compose-action",function(e){e.preventDefault();var t=$(this).val();if(t=="send")var n="update/send/",r="success",i='Your message was sent <a id="status-undo-link" data-action="undo-send" href="#">undo</a>';else if(t=="save")var n="update/",r="info",i="Your message was saved";$.ajax({url:"/api/0/message/"+n,type:"POST",data:$("#form-compose").serialize(),dataType:"json",success:function(e){t=="send"&&e.status=="success"?window.location.href="/in/Sent/?ui_sent="+e.result.messages[0].mid:statusMessage(e.status,e.message)}})});$(document).on("click","#button-tag-add",function(e){e.preventDefault();var t=$("#template-tag-add").html();$("#tags-list").html(t);$this_nav=$(this);console.log($this_nav);$("#sub-navigation").find("ul li").removeClass("navigation-on",function(){$this_nav.parent().addClass("navigation-on")})});$(document).on("submit","#form-tag-add",function(e){e.preventDefault();var t=$("#form-tag-add").serialize();console.log($(this));$.ajax({url:$(this).attr("action")+$("#data-tag-add-tag").val()+"/",type:"POST",data:t,dataType:"json",success:function(e){e.status=="success"?console.log(e):statusMessage(e.status,e.message)}})});