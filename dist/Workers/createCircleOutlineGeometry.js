/*! For license information please see createCircleOutlineGeometry.js.LICENSE.txt */
import{a as n}from"./chunk-E7SCGOHT.js";import"./chunk-KW7R7J2E.js";import"./chunk-2DNLGXTL.js";import"./chunk-EQ7PMEBC.js";import"./chunk-FDDSRMXI.js";import"./chunk-YYYI3I6L.js";import"./chunk-YIFABOF6.js";import"./chunk-PQVQONHO.js";import"./chunk-KDW4RGIR.js";import"./chunk-VNDUYYBJ.js";import{a as o,c as s}from"./chunk-V624RX7A.js";import"./chunk-VZ2RFJ3P.js";import"./chunk-RN5GA5QZ.js";import"./chunk-TWC6ISJU.js";import{a as u}from"./chunk-RKPKWH3Z.js";import{b as d}from"./chunk-BIYNNQRQ.js";import{e as a}from"./chunk-ZLUSVROX.js";function m(e){let i=(e=u(e,u.EMPTY_OBJECT)).radius;d.typeOf.number("radius",i);let r={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new n(r),this._workerName="createCircleOutlineGeometry"}m.packedLength=n.packedLength,m.pack=function(e,i,r){return d.typeOf.object("value",e),n.pack(e._ellipseGeometry,i,r)};var p=new n({center:new o,semiMajorAxis:1,semiMinorAxis:1}),i={center:new o,radius:void 0,ellipsoid:s.clone(s.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};m.unpack=function(e,r,t){let c=n.unpack(e,r,p);return i.center=o.clone(c._center,i.center),i.ellipsoid=s.clone(c._ellipsoid,i.ellipsoid),i.height=c._height,i.extrudedHeight=c._extrudedHeight,i.granularity=c._granularity,i.numberOfVerticalLines=c._numberOfVerticalLines,a(t)?(i.semiMajorAxis=c._semiMajorAxis,i.semiMinorAxis=c._semiMinorAxis,t._ellipseGeometry=new n(i),t):(i.radius=c._semiMajorAxis,new m(i))},m.createGeometry=function(e){return n.createGeometry(e._ellipseGeometry)};var c=m;function f(e,i){return a(i)&&(e=c.unpack(e,i)),e._ellipseGeometry._center=o.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=s.clone(e._ellipseGeometry._ellipsoid),c.createGeometry(e)}var E=f;export{E as default};