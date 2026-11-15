import test from 'node:test';import assert from 'node:assert/strict';import quiz from '../src/data/quiz.json' with {type:'json'};import {scoreAnswers} from '../src/utils/scoring.js';
test('36 questions, 12 traits, complete weights',()=>{assert.equal(quiz.questions.length,36);assert.equal(quiz.traits.length,12);for(const q of quiz.questions)assert.equal(Object.keys(q.weights).length,12)});
test('neutral answers give 50 points for all traits',()=>{const answers=Object.fromEntries(quiz.questions.map(q=>[q.id,0]));assert.ok(scoreAnswers(answers).every(r=>r.normalized===50&&r.raw===0))});
test('scores remain within theoretical 0-100 range',()=>{for(const value of [-2,-1,0,1,2]){const a=Object.fromEntries(quiz.questions.map(q=>[q.id,value]));assert.ok(scoreAnswers(a).every(r=>r.normalized>=0&&r.normalized<=100))}});
test('negative weight is subtracted when response is positive',()=>{const a=Object.fromEntries(quiz.questions.map(q=>[q.id,0]));a['D-1']=2;const d2=scoreAnswers(a).find(x=>x.id==='D2');assert.equal(d2.raw,-6)});
test('incomplete response throws',()=>assert.throws(()=>scoreAnswers({})));
