import quiz from '../data/quiz.json' with { type: 'json' };
export const CHOICES = [{label:'非常不符合',value:-2},{label:'不太符合',value:-1},{label:'普通',value:0},{label:'有點符合',value:1},{label:'非常符合',value:2}];
export function scoreAnswers(answers) {
  if (quiz.questions.some(q => !Object.prototype.hasOwnProperty.call(answers,q.id))) throw new Error('尚有未完成的題目');
  return quiz.traits.map(trait => {
    const contributions=quiz.questions.map(q=>({id:q.id,text:q.text,answer:answers[q.id],weight:q.weights[trait.id],points:answers[q.id]*q.weights[trait.id]}));
    const raw=contributions.reduce((a,c)=>a+c.points,0);
    const limit=2*quiz.questions.reduce((a,q)=>a+Math.abs(q.weights[trait.id]),0);
    const normalized=limit===0?50:(raw+limit)/(2*limit)*100;
    return {...trait,raw,limit,normalized,contributions};
  }).sort((a,b)=>b.normalized-a.normalized || b.raw-a.raw || a.id.localeCompare(b.id));
}
