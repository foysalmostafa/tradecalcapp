/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./loader.cjs');
const { BLOG_POSTS, PUBLISHED_POSTS }=load('src/lib/blog.ts');
const { CALCULATORS }=load('src/lib/calculators.ts');
test('all original articles and calculator routes retained, drafts stay drafts',()=>{
 assert.equal(BLOG_POSTS.length,62);assert.equal(PUBLISHED_POSTS.length,21);
 assert.equal(CALCULATORS.length,53);
 assert.equal(new Set(BLOG_POSTS.map(p=>p.slug)).size,62);
 assert.equal(new Set(CALCULATORS.map(c=>c.slug)).size,53);
});
test('all 53 routes map to implemented calculators',()=>{
 const page=fs.readFileSync(path.resolve(__dirname,'../src/app/calculators/[slug]/page.tsx'),'utf8');
 const map=page.split('const CALC_COMPONENT:')[1].split('};')[0];
 for(const c of CALCULATORS) assert.ok(map.includes(`'${c.slug}'`),c.slug);
});
for(const post of BLOG_POSTS) test(`content: ${post.slug}`,()=>{
 const text=JSON.stringify(post);
 assert.ok(post.sections.length>=5);
 assert.ok(post.sections.every(s=>s.body.length&&s.body.every(p=>p.trim())));
 assert.ok(post.readingTimeMin>0);
 for(const slug of post.relatedCalculators)assert.ok(CALCULATORS.some(c=>c.slug===slug),slug);
 for(const slug of post.relatedPosts)assert.ok(PUBLISHED_POSTS.some(p=>p.slug===slug),slug);
 for(const match of text.matchAll(/\]\(\/blog\/([^\)]+)\)/g))assert.ok(PUBLISHED_POSTS.some(p=>p.slug===match[1]),match[1]);
 for(const match of text.matchAll(/\]\(\/calculators\/([^\)]+)\)/g))assert.ok(CALCULATORS.some(c=>c.slug===match[1]),match[1]);
 assert.ok(CALCULATORS.some(c=>post.callToAction.href===`/calculators/${c.slug}`));
 assert.ok(!/guaranteed profit|realistic monthly returns|professional standard|no-risk|risk-free income/i.test(text));
});
test('calculator explanations contain formula, example and limitations',()=>{
 for(const c of CALCULATORS){assert.ok(c.formula&&c.workedExample&&c.longDescription,c.slug);assert.equal(c.faqs.length,3);}
});
