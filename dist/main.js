!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);var r=function(t){var e,n,r=t.data.child.toUpperCase(),i=window.state.ingredients[r],a=window.state.drinks[r];i&&(e=[i.strIngredient,i.strDescription]),a&&(n=[a.strDrink,a.strAlcoholic,a.strCategory,a.strGlass,a.strInstructions]);var o=e||n;d3.select("ul").remove(),d3.select("#information-box").append("ul").selectAll("li").data(o).enter().append("li").html(String)};function i(){var t=this.getBBox();return[t.x,t.y,t.width,t.height]}var a=function(){d3.select("svg").remove();var t=d3.select("#app").append("svg").attr("width",975).attr("height",975),e=d3.stratify().id((function(t){return t.child})).parentId((function(t){return t.parent}))(window.tree_data),n=d3.cluster().size([360,427.5])(e),a=d3.linkRadial().angle((function(t){return t.x/180*Math.PI})).radius((function(t){return t.y}));t.selectAll("path").data(n.links()).enter().append("path").attr("d",a).style("fill","none").attr("stroke","#ccc");var o=t.selectAll("g").data(n.descendants()).enter().append("g").attr("transform",(function(t){return"rotate("+(t.x-90)+")translate("+t.y+")"}));o.append("image").attr("href",(function(t){return t.data.image})).attr("x","-12px").attr("y","-12px").attr("width","24px").attr("height","24px").attr("transform",(function(t){return t.child?"rotate(".concat(-(t.x-90),")"):t.x>=180?"rotate(180)":null})).on("click",(function(t){return r(t)})),o.append("text").text((function(t){return t.data.child})).classed("text",!0).attr("font-size",(function(t){return 10+3*t.height})).attr("x",(function(t){return t.x<180==!t.child?t.height+8:-(t.height+8)})).attr("text-anchor",(function(t){return t.x<180==!t.child?"start":"end"})).attr("transform",(function(t){return t.child?"rotate(".concat(-(t.x-90),")"):t.x>=180?"rotate(180)":null})).on("click",(function(t){return r(t)})),t.attr("viewBox",i)},o=function(t){return t.split(" ").map((function(t){return t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()})).join(" ")},c=function(t){t=t.toLowerCase(),state.drinks={};var e=[];window.tree_data=e,d3.json("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+t).then((function(n){e.push({parent:"",child:t,image:null});var r=n.drinks,i=[];r.map((function(n,r){e.push({parent:t,child:o(n.strDrink),image:n.strDrinkThumb}),i[r]=d3.json("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+n.idDrink).then((function(t){var n=t.drinks[0];state.drinks[n.strDrink.toUpperCase()]=n;for(var r=1;r<=15;r++)null!==n["strIngredient".concat(r)]&&e.push({parent:o(n.strDrink),child:o(n["strIngredient".concat(r)]),image:"https://www.thecocktaildb.com/images/ingredients/".concat(n["strIngredient".concat(r)],".png")})}))})),Promise.all(i).then((function(){return a()}))})).catch((function(){}))},s=function(){state.ingredients={};var t=[];window.ingredients_list=t;for(var e=[],n=0;n<1e3;n++)e[n]=fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=".concat(n)).then((function(t){return t.json()})).then((function(e){var n=e.ingredients[0];state.ingredients[n.strIngredient.toUpperCase()]=n,t.push(n.strIngredient)})).catch((function(){}));Promise.all(e).then((function(){return document.getElementById("ingredient").disabled=!1}))},u=function(t,e){var n;function r(t){if(!t)return!1;!function(t){for(var e=0;e<t.length;e++)t[e].classList.remove("autocomplete-active")}(t),n>=t.length&&(n=0),n<0&&(n=t.length-1),t[n].classList.add("autocomplete-active")}function i(e){for(var n=document.getElementsByClassName("autocomplete-items"),r=0;r<n.length;r++)e!=n[r]&&e!=t&&n[r].parentNode.removeChild(n[r])}t.addEventListener("input",(function(r){var a,o,c,s=this.value;if(i(),!s)return!1;for(n=-1,(a=document.createElement("DIV")).setAttribute("id",this.id+"autocomplete-list"),a.setAttribute("class","autocomplete-items"),this.parentNode.appendChild(a),c=0;c<e.length;c++)e[c].substr(0,s.length).toUpperCase()==s.toUpperCase()&&((o=document.createElement("DIV")).innerHTML="<strong>"+e[c].substr(0,s.length)+"</strong>",o.innerHTML+=e[c].substr(s.length),o.innerHTML+="<input type='hidden' value='"+e[c]+"'>",o.addEventListener("click",(function(e){t.value=this.getElementsByTagName("input")[0].value,i()})),a.appendChild(o))})),t.addEventListener("keydown",(function(t){var e=document.getElementById(this.id+"autocomplete-list");e&&(e=e.getElementsByTagName("div")),40==t.keyCode?(n++,r(e)):38==t.keyCode?(n--,r(e)):13==t.keyCode&&(t.preventDefault(),n>-1&&e&&e[n].click())})),document.addEventListener("click",(function(t){i(t.target)}))};document.addEventListener("DOMContentLoaded",(function(){window.state={},s();var t=document.getElementById("ingredient");u(t,window.ingredients_list),t.addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),""!==t.value&&c(t.value))}))}))}]);
//# sourceMappingURL=main.js.map