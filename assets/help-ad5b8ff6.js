import{g as o}from"./getEnv-9bda9e15.js";const e="Show help message",t=async()=>o().commands.map(n=>`  - ${n.name}	${n.description?`(${n.description})`:""}`).join(`
`);export{e as _description_,t as default};
