webpackJsonp([6],{MJLE:function(t,e,o){var r,i;i=function(){function t(t){this.mode=o.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var i=[],a=this.data.charCodeAt(e);a>65536?(i[0]=240|(1835008&a)>>>18,i[1]=128|(258048&a)>>>12,i[2]=128|(4032&a)>>>6,i[3]=128|63&a):a>2048?(i[0]=224|(61440&a)>>>12,i[1]=128|(4032&a)>>>6,i[2]=128|63&a):a>128?(i[0]=192|(1984&a)>>>6,i[1]=128|63&a):i[0]=a,this.parsedData.push(i)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,o=this.parsedData.length;e<o;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){var o=new t(e);this.dataList.push(o),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,o){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[r][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,o),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,o)},setupPositionProbePattern:function(t,e){for(var o=-1;o<=7;o++)if(!(t+o<=-1||this.moduleCount<=t+o))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+o][e+r]=0<=o&&o<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==o||6==o)||2<=o&&o<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,o=0;o<8;o++){this.makeImpl(!0,o);var r=f.getLostPoint(this);(0==o||t>r)&&(t=r,e=o)}return e},createMovieClip:function(t,e,o){var r=t.createEmptyMovieClip(e,o);this.make();for(var i=0;i<this.modules.length;i++)for(var a=1*i,n=0;n<this.modules[i].length;n++){var s=1*n;this.modules[i][n]&&(r.beginFill(0,100),r.moveTo(s,a),r.lineTo(s+1,a),r.lineTo(s+1,a+1),r.lineTo(s,a+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=f.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var o=0;o<t.length;o++){var r=t[e],i=t[o];if(null==this.modules[r][i])for(var a=-2;a<=2;a++)for(var n=-2;n<=2;n++)this.modules[r+a][i+n]=-2==a||2==a||-2==n||2==n||0==a&&0==n}},setupTypeNumber:function(t){for(var e=f.getBCHTypeNumber(this.typeNumber),o=0;o<18;o++){var r=!t&&1==(e>>o&1);this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=r}for(o=0;o<18;o++){r=!t&&1==(e>>o&1);this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=r}},setupTypeInfo:function(t,e){for(var o=this.errorCorrectLevel<<3|e,r=f.getBCHTypeInfo(o),i=0;i<15;i++){var a=!t&&1==(r>>i&1);i<6?this.modules[i][8]=a:i<8?this.modules[i+1][8]=a:this.modules[this.moduleCount-15+i][8]=a}for(i=0;i<15;i++){a=!t&&1==(r>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=a:i<9?this.modules[8][15-i-1+1]=a:this.modules[8][15-i-1]=a}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var o=-1,r=this.moduleCount-1,i=7,a=0,n=this.moduleCount-1;n>0;n-=2)for(6==n&&n--;;){for(var s=0;s<2;s++)if(null==this.modules[r][n-s]){var l=!1;a<t.length&&(l=1==(t[a]>>>i&1)),f.getMask(e,r,n-s)&&(l=!l),this.modules[r][n-s]=l,-1==--i&&(a++,i=7)}if((r+=o)<0||this.moduleCount<=r){r-=o,o=-o;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,o,r){for(var i=v.getRSBlocks(t,o),a=new _,n=0;n<r.length;n++){var s=r[n];a.put(s.mode,4),a.put(s.getLength(),f.getLengthInBits(s.mode,t)),s.write(a)}var l=0;for(n=0;n<i.length;n++)l+=i[n].dataCount;if(a.getLengthInBits()>8*l)throw new Error("code length overflow. ("+a.getLengthInBits()+">"+8*l+")");for(a.getLengthInBits()+4<=8*l&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*l||(a.put(e.PAD0,8),a.getLengthInBits()>=8*l));)a.put(e.PAD1,8);return e.createBytes(a,i)},e.createBytes=function(t,e){for(var o=0,r=0,i=0,a=new Array(e.length),n=new Array(e.length),s=0;s<e.length;s++){var l=e[s].dataCount,h=e[s].totalCount-l;r=Math.max(r,l),i=Math.max(i,h),a[s]=new Array(l);for(var u=0;u<a[s].length;u++)a[s][u]=255&t.buffer[u+o];o+=l;var d=f.getErrorCorrectPolynomial(h),c=new p(a[s],d.getLength()-1).mod(d);n[s]=new Array(d.getLength()-1);for(u=0;u<n[s].length;u++){var g=u+c.getLength()-n[s].length;n[s][u]=g>=0?c.get(g):0}}var m=0;for(u=0;u<e.length;u++)m+=e[u].totalCount;var v=new Array(m),_=0;for(u=0;u<r;u++)for(s=0;s<e.length;s++)u<a[s].length&&(v[_++]=a[s][u]);for(u=0;u<i;u++)for(s=0;s<e.length;s++)u<n[s].length&&(v[_++]=n[s][u]);return v};for(var o={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i={L:1,M:0,Q:3,H:2},a=0,n=1,s=2,l=3,h=4,u=5,d=6,c=7,f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;f.getBCHDigit(e)-f.getBCHDigit(f.G15)>=0;)e^=f.G15<<f.getBCHDigit(e)-f.getBCHDigit(f.G15);return(t<<10|e)^f.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;f.getBCHDigit(e)-f.getBCHDigit(f.G18)>=0;)e^=f.G18<<f.getBCHDigit(e)-f.getBCHDigit(f.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return f.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,o){switch(t){case a:return(e+o)%2==0;case n:return e%2==0;case s:return o%3==0;case l:return(e+o)%3==0;case h:return(Math.floor(e/2)+Math.floor(o/3))%2==0;case u:return e*o%2+e*o%3==0;case d:return(e*o%2+e*o%3)%2==0;case c:return(e*o%3+(e+o)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new p([1],0),o=0;o<t;o++)e=e.multiply(new p([1,g.gexp(o)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case o.MODE_NUMBER:return 10;case o.MODE_ALPHA_NUM:return 9;case o.MODE_8BIT_BYTE:case o.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case o.MODE_NUMBER:return 12;case o.MODE_ALPHA_NUM:return 11;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case o.MODE_NUMBER:return 14;case o.MODE_ALPHA_NUM:return 13;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),o=0,r=0;r<e;r++)for(var i=0;i<e;i++){for(var a=0,n=t.isDark(r,i),s=-1;s<=1;s++)if(!(r+s<0||e<=r+s))for(var l=-1;l<=1;l++)i+l<0||e<=i+l||0==s&&0==l||n==t.isDark(r+s,i+l)&&a++;a>5&&(o+=3+a-5)}for(r=0;r<e-1;r++)for(i=0;i<e-1;i++){var h=0;t.isDark(r,i)&&h++,t.isDark(r+1,i)&&h++,t.isDark(r,i+1)&&h++,t.isDark(r+1,i+1)&&h++,0!=h&&4!=h||(o+=3)}for(r=0;r<e;r++)for(i=0;i<e-6;i++)t.isDark(r,i)&&!t.isDark(r,i+1)&&t.isDark(r,i+2)&&t.isDark(r,i+3)&&t.isDark(r,i+4)&&!t.isDark(r,i+5)&&t.isDark(r,i+6)&&(o+=40);for(i=0;i<e;i++)for(r=0;r<e-6;r++)t.isDark(r,i)&&!t.isDark(r+1,i)&&t.isDark(r+2,i)&&t.isDark(r+3,i)&&t.isDark(r+4,i)&&!t.isDark(r+5,i)&&t.isDark(r+6,i)&&(o+=40);var u=0;for(i=0;i<e;i++)for(r=0;r<e;r++)t.isDark(r,i)&&u++;return o+=10*(Math.abs(100*u/e/e-50)/5)}},g={glog:function(t){if(t<1)throw new Error("glog("+t+")");return g.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return g.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},m=0;m<8;m++)g.EXP_TABLE[m]=1<<m;for(m=8;m<256;m++)g.EXP_TABLE[m]=g.EXP_TABLE[m-4]^g.EXP_TABLE[m-5]^g.EXP_TABLE[m-6]^g.EXP_TABLE[m-8];for(m=0;m<255;m++)g.LOG_TABLE[g.EXP_TABLE[m]]=m;function p(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var o=0;o<t.length&&0==t[o];)o++;this.num=new Array(t.length-o+e);for(var r=0;r<t.length-o;r++)this.num[r]=t[r+o]}function v(t,e){this.totalCount=t,this.dataCount=e}function _(){this.buffer=[],this.length=0}p.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),o=0;o<this.getLength();o++)for(var r=0;r<t.getLength();r++)e[o+r]^=g.gexp(g.glog(this.get(o))+g.glog(t.get(r)));return new p(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=g.glog(this.get(0))-g.glog(t.get(0)),o=new Array(this.getLength()),r=0;r<this.getLength();r++)o[r]=this.get(r);for(r=0;r<t.getLength();r++)o[r]^=g.gexp(g.glog(t.get(r))+e);return new p(o,0).mod(t)}},v.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],v.getRSBlocks=function(t,e){var o=v.getRsBlockTable(t,e);if(void 0==o)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=o.length/3,i=[],a=0;a<r;a++)for(var n=o[3*a+0],s=o[3*a+1],l=o[3*a+2],h=0;h<n;h++)i.push(new v(s,l));return i},v.getRsBlockTable=function(t,e){switch(e){case i.L:return v.RS_BLOCK_TABLE[4*(t-1)+0];case i.M:return v.RS_BLOCK_TABLE[4*(t-1)+1];case i.Q:return v.RS_BLOCK_TABLE[4*(t-1)+2];case i.H:return v.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},_.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var o=0;o<e;o++)this.putBit(1==(t>>>e-o-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var y=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function C(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var o=e.toString().match(/android ([0-9]\.[0-9])/i);o&&o[1]&&(t=parseFloat(o[1]))}return t}var w=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){var e=this._htOption,o=this._el,r=t.getModuleCount();Math.floor(e.width/r),Math.floor(e.height/r);function i(t,e){var o=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)e.hasOwnProperty(r)&&o.setAttribute(r,e[r]);return o}this.clear();var a=i("svg",{viewBox:"0 0 "+String(r)+" "+String(r),width:"100%",height:"100%",fill:e.colorLight});a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),o.appendChild(a),a.appendChild(i("rect",{fill:e.colorLight,width:"100%",height:"100%"})),a.appendChild(i("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(var n=0;n<r;n++)for(var s=0;s<r;s++)if(t.isDark(n,s)){var l=i("use",{x:String(s),y:String(n)});l.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),a.appendChild(l)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),b="svg"===document.documentElement.tagName.toLowerCase()?w:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,o=this._el,r=t.getModuleCount(),i=Math.floor(e.width/r),a=Math.floor(e.height/r),n=['<table style="border:0;border-collapse:collapse;">'],s=0;s<r;s++){n.push("<tr>");for(var l=0;l<r;l++)n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+i+"px;height:"+a+"px;background-color:"+(t.isDark(s,l)?e.colorDark:e.colorLight)+';"></td>');n.push("</tr>")}n.push("</table>"),o.innerHTML=n.join("");var h=o.childNodes[0],u=(e.width-h.offsetWidth)/2,d=(e.height-h.offsetHeight)/2;u>0&&d>0&&(h.style.margin=d+"px "+u+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this._android&&this._android<=2.1){var e=1/window.devicePixelRatio,o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,r,i,a,n,s,l,h,u){if("nodeName"in t&&/img/i.test(t.nodeName))for(var d=arguments.length-1;d>=1;d--)arguments[d]=arguments[d]*e;else void 0===h&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);o.apply(this,arguments)}}var r=function(t,e){this._bIsPainted=!1,this._android=C(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return r.prototype.draw=function(t){var e=this._elImage,o=this._oContext,r=this._htOption,i=t.getModuleCount(),a=r.width/i,n=r.height/i,s=Math.round(a),l=Math.round(n);e.style.display="none",this.clear();for(var h=0;h<i;h++)for(var u=0;u<i;u++){var d=t.isDark(h,u),c=u*a,f=h*n;o.strokeStyle=d?r.colorDark:r.colorLight,o.lineWidth=1,o.fillStyle=d?r.colorDark:r.colorLight,o.fillRect(c,f,a,n),o.strokeRect(Math.floor(c)+.5,Math.floor(f)+.5,s,l),o.strokeRect(Math.ceil(c)-.5,Math.ceil(f)-.5,s,l)}this._bIsPainted=!0},r.prototype.makeImage=function(){this._bIsPainted&&function(t,e){var o=this;if(o._fFail=e,o._fSuccess=t,null===o._bSupportDataURI){var r=document.createElement("img"),i=function(){o._bSupportDataURI=!1,o._fFail&&o._fFail.call(o)};return r.onabort=i,r.onerror=i,r.onload=function(){o._bSupportDataURI=!0,o._fSuccess&&o._fSuccess.call(o)},void(r.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===o._bSupportDataURI&&o._fSuccess?o._fSuccess.call(o):!1===o._bSupportDataURI&&o._fFail&&o._fFail.call(o)}.call(this,t)},r.prototype.isPainted=function(){return this._bIsPainted},r.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},r.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},r}();function L(t,e){for(var o=1,r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),a=0,n=y.length;a<=n;a++){var s=0;switch(e){case i.L:s=y[a][0];break;case i.M:s=y[a][1];break;case i.Q:s=y[a][2];break;case i.H:s=y[a][3]}if(r<=s)break;o++}if(o>y.length)throw new Error("Too long data");return o}return(r=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:i.H},"string"==typeof e&&(e={text:e}),e)for(var o in e)this._htOption[o]=e[o];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(b=w),this._android=C(),this._el=t,this._oQRCode=null,this._oDrawing=new b(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){this._oQRCode=new e(L(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},r.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},r.prototype.clear=function(){this._oDrawing.clear()},r.CorrectLevel=i,r},t.exports=i()},TuPi:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("Dd8w"),i=o.n(r),a=o("NYxO"),n=o("Wxq9"),s=o("Av7u"),l=o.n(s),h=o("MJLE"),u=o.n(h),d={name:"Recharge",data:function(){var t=this;return{fullHeight:.5*document.documentElement.clientHeight+"px",CodeToText:n.CodeToText,TextToCode:n.TextToCode,provinceAndCityData:n.provinceAndCityData,selectedOptions:[],ModifyInformationList:{money:"500",PaymentMethod:"1"},WXRechargeCodeName:!1,ZFBRechargeCodeName:!1,timeCounter:0,OrderNosetTime:null,AlipayOrderNosetTime:null,rules:{Phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{pattern:/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],password_confirm:[{required:!0,validator:function(e,o,r){console.log(o),""===o?r(new Error("请再次输入密码")):o!==t.BodifyInformationList.Password?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}],TrueName:[{required:!0,message:"请输入真实姓名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],CardNum:[{required:!0,message:"请输入身份证号码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 30 个字符",trigger:"blur"}]}}},computed:i()({},Object(a.b)(["Id","AgencyName","AgencyBalance","EarningOfPaying"])),created:function(){},methods:i()({},Object(a.c)(["SET_ACCOUNT"]),{getUser:function(){var t=this;this.axios.get("/api/Agency/GetAgencyInfo",{}).then(function(e){if("OK"==e.statusText){var o=e.data.Object;t.ModifyInformationList=o}else t.$message.error(e.data.Message)})},EditSubmit:function(t){var e=this;if(1==this.ModifyInformationList.PaymentMethod){var o={money:this.ModifyInformationList.money},r=this;this.axios.post("/api/Recharge/Recharge?money="+this.ModifyInformationList.money,o).then(function(t){if("OK"==t.statusText){r.WXRechargeCodeName=!0;var e=t.data.Object.Url;r.OrderNosetTimeout(t.data.Object.OrderNo),r.$nextTick(function(){document.getElementById("qrcode").innerHTML="";new u.a("qrcode",{width:200,height:200,text:e,colorDark:"#000",colorLight:"#fff"})})}else r.$message.error(t.data.Message)})}if(2==this.ModifyInformationList.PaymentMethod){var i={money:this.ModifyInformationList.money};r=this;this.axios.post("/api/Recharge/AlipayRecharge?money="+this.ModifyInformationList.money,i).then(function(t){if("OK"==t.statusText){r.ZFBRechargeCodeName=!0;var e=t.data.Object.Url;r.AlipayRechargeLoopQuery(t.data.Object.OrderNo),r.$nextTick(function(){document.getElementById("ZFBqrcode").innerHTML="";new u.a("ZFBqrcode",{width:200,height:200,text:e,colorDark:"#000",colorLight:"#fff"})})}else r.$message.error(t.data.Message)})}3==this.ModifyInformationList.PaymentMethod&&this.$refs[t].validate(function(o){if(!o)return!1;var r=l.a.MD5(e.ModifyInformationList.password).toString(),i={password:r,money:e.ModifyInformationList.money},a=e;e.axios.post("/api/Agency/EarningsToRecharge?password="+r+"&money="+e.ModifyInformationList.money,i).then(function(t){"OK"==t.statusText?(a.$store.dispatch("GetInfo").then(function(){}).catch(function(){}),a.$message({message:"充值成功",type:"success"})):a.$message.error(t.data.Message)}),e.$refs[t].resetFields()})},OrderNosetTimeout:function(t){var e=this;this.timeCounter++,this.timeCounter<=40?this.OrderNosetTime=window.setTimeout(function(){var o=this;e.axios.post("/api/Recharge/RechargeLoopQuery?rechargeNo="+t,{}).then(function(r){r.data.Object?(e.$store.dispatch("GetInfo").then(function(){}).catch(function(){}),e.WXRechargeCodeName=!1,e.timeCounter=0,window.clearTimeout(o.OrderNosetTime),e.$message({message:"充值成功",type:"success"})):e.OrderNosetTimeout(t)})},2e3):(e.timeCounter=0,e.WXRechargeCodeName=!1,window.clearTimeout(this.OrderNosetTime),e.$message({message:"支付超时，请重新支付...",type:"error"}))},AlipayRechargeLoopQuery:function(t){var e=this;this.timeCounter++,this.timeCounter<=40?this.AlipayOrderNosetTime=window.setTimeout(function(){var o=this;e.axios.post("/api/Recharge/AlipayRechargeLoopQuery?rechargeNo="+t,{}).then(function(r){r.data.Object?(e.$store.dispatch("GetInfo").then(function(){}).catch(function(){}),e.ZFBRechargeCodeName=!1,e.timeCounter=0,window.clearTimeout(o.AlipayOrderNosetTime),e.$message({message:"充值成功",type:"success"})):e.AlipayRechargeLoopQuery(t)})},2e3):(e.timeCounter=0,e.ZFBRechargeCodeName=!1,window.clearTimeout(this.AlipayOrderNosetTime),e.$message({message:"支付超时，请重新支付...",type:"error"}))},closeDialog:function(){this.timeCounter=0,window.clearTimeout(this.OrderNosetTime)},ZFBcloseDialog:function(){this.timeCounter=0,window.clearTimeout(this.AlipayOrderNosetTime)}})},c={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ModifyInformation"},[o("div",{staticClass:"ModifyInformation_body animated fadeInDown"},[t._m(0),t._v(" "),o("br"),t._v(" "),o("el-card",{attrs:{shadow:"always"}},[o("div",{staticClass:"grid-content bg-purple",style:{minHeight:t.fullHeight}},[o("el-form",{ref:"ModifyInformationList",staticClass:"demo-ruleForm",attrs:{model:t.ModifyInformationList,rules:t.rules,"label-width":"250px"}},[o("br"),t._v(" "),o("br"),t._v(" "),o("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[o("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:18,xl:18}},[o("el-form-item",{attrs:{label:"充值金额：",prop:"NetbarName"}},[o("el-radio-group",{staticClass:"el_radio_web",attrs:{size:"medium"},model:{value:t.ModifyInformationList.money,callback:function(e){t.$set(t.ModifyInformationList,"money",e)},expression:"ModifyInformationList.money"}},[o("el-radio",{attrs:{label:"500",border:""}},[t._v("500元")]),t._v(" "),o("el-radio",{attrs:{label:"1000",border:"",size:"medium"}},[t._v("1000元")]),t._v(" "),o("el-radio",{attrs:{label:"2000",border:"",size:"medium"}},[t._v("2000元")]),t._v(" "),o("el-radio",{attrs:{label:"3000",border:"",size:"medium"}},[t._v("3000元")])],1)],1)],1)],1),t._v(" "),o("br"),t._v(" "),o("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[o("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:12,lg:18,xl:10}},[o("el-form-item",{attrs:{label:"自定义金额：",prop:"NetbarId"}},[o("el-input",{attrs:{"auto-complete":"off",size:"medium"},model:{value:t.ModifyInformationList.money,callback:function(e){t.$set(t.ModifyInformationList,"money",e)},expression:"ModifyInformationList.money"}})],1)],1)],1),t._v(" "),o("br"),t._v(" "),o("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[o("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:18,lg:18,xl:18}},[o("el-form-item",{attrs:{label:"支付方式：",prop:"AgencyName",size:"medium",fill:"#fff"}},[o("el-radio-group",{staticClass:"el_radio_web",model:{value:t.ModifyInformationList.PaymentMethod,callback:function(e){t.$set(t.ModifyInformationList,"PaymentMethod",e)},expression:"ModifyInformationList.PaymentMethod"}},[o("el-radio",{attrs:{label:"1",border:"",size:"medium"}},[t._v(" 微信支付")]),t._v(" "),o("el-radio",{attrs:{label:"2",border:"",size:"medium"}},[t._v(" 支付宝支付")]),t._v(" "),o("el-radio",{attrs:{label:"3",border:"",size:"medium"}},[t._v("可提现收益充值(剩余"+t._s(t.EarningOfPaying)+"元)")])],1)],1)],1)],1),t._v(" "),o("p",{staticStyle:{"padding-left":"250px","font-size":"16px",color:"#ff6d60"}},[t._v("*注：可消费余额用于平台产品消费，不可提现")]),t._v(" "),o("br"),t._v(" "),3==t.ModifyInformationList.PaymentMethod?o("el-row",{staticStyle:{width:"100%"},attrs:{gutter:10}},[o("el-col",{staticClass:"td1",attrs:{xs:24,sm:24,md:18,lg:18,xl:10}},[o("el-form-item",{attrs:{label:"输入您的密码确认身份：",prop:"password"}},[o("el-input",{attrs:{"auto-complete":"off",type:"password",size:"medium"},model:{value:t.ModifyInformationList.password,callback:function(e){t.$set(t.ModifyInformationList,"password",e)},expression:"ModifyInformationList.password"}})],1),t._v(" "),o("p",{staticStyle:{"padding-left":"250px","font-size":"16px",color:"#ff6d60","margin-top":"28px"}},[t._v("收益提现充值进消费余额后，该所充值余额只可用于消费。")])],1)],1):t._e()],1),t._v(" "),o("div",{staticClass:"dialog-footer",staticStyle:{"padding-left":"250px"},attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"success",size:"medium"},nativeOn:{click:function(e){t.EditSubmit("ModifyInformationList")}}},[o("i",{staticClass:"icon iconfont iconchongzhi",staticStyle:{"font-size":"20px","vertical-align":"middle"}}),t._v(" 立即支付")])],1)],1)])],1),t._v(" "),o("el-dialog",{attrs:{title:"微信二维码",visible:t.WXRechargeCodeName,center:"",width:"500px"},on:{"update:visible":function(e){t.WXRechargeCodeName=e},close:t.closeDialog}},[o("div",{staticClass:"Recharge_wx"},[o("p",[t._v("打开手机微信，扫一扫下方二维码，即可完成支付")]),t._v(" "),o("i",{staticClass:"icon iconfont iconicon_wechat",staticStyle:{color:"#84dc43"}}),t._v(" "),o("div",{staticClass:"erweima",attrs:{refs:"qrcode",id:"qrcode"}})]),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),t._v(" "),o("el-dialog",{attrs:{title:"支付宝二维码",visible:t.ZFBRechargeCodeName,center:"",width:"500px"},on:{"update:visible":function(e){t.ZFBRechargeCodeName=e},close:t.ZFBcloseDialog}},[o("div",{staticClass:"Recharge_wx"},[o("p",[t._v("打开支付宝微信，扫一扫下方二维码，即可完成支付")]),t._v(" "),o("i",{staticClass:"icon iconfont iconicon_alipay_line",staticStyle:{color:"rgb(0, 160, 233)"}}),t._v(" "),o("div",{staticClass:"erweima",attrs:{refs:"ZFBqrcode",id:"ZFBqrcode"}})]),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title_h4"},[e("i",{staticClass:"icon iconfont iconchongzhi1"}),this._v(" 充值可消费余额 ")])}]},f=o("VU/8")(d,c,!1,null,null,null);e.default=f.exports}});
//# sourceMappingURL=6.209e073facdcd8ce562c.js.map