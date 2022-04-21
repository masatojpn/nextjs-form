import React from 'react';
import { useFieldArray } from 'react-hook-form';

export const TaskCard = ( { projectIndex, control, register }:any) => {

	const { fields, append, remove, prepend } = useFieldArray({
		control,
		name: `posts.projects.${projectIndex}.tasks`
	});

	return(
    <div className="space-y-10">
      {fields.map((task, taskIndex) => {
        return(
          <div className="relative block rounded-lg shadow-md w-full p-6 bg-slate-100">
            <div className="flex w-full gap-4">
              <div className="w-3/4">
                <textarea
                  className="block w-full rounded-md border-0 p-4 h-full text-sm font-mono"
                  {...register(`posts.projects.${projectIndex}.tasks.${taskIndex}.taskTitle`, {
                  required: {
                    value: true,
                    message: 'タスクを入力してください',
                  }
                })} />
              </div>
              <div className="w-1/4 space-y-4">
                <input
                  className="block w-full rounded-md border-0 p-4 text-sm font-mono"
                  type="number"
                  step={0.5}
                  max={12}
                  {...register(`posts.projects.${projectIndex}.tasks.${taskIndex}.category`, {
                  required: {
                    value: true,
                    message: '作業時間',
                  }
                })} />
                <input
                  className="block w-full rounded-md border-0 p-4 text-sm font-mono"
                  type="text"
                  {...register(`posts.projects.${projectIndex}.tasks.${taskIndex}.category`, {
                  required: {
                    value: true,
                    message: 'タスクを入力してください',
                  }
                })} />
              </div>
            </div>

            <button
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
              type="button"
              onClick={() => remove(taskIndex)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        );
      })}
      <button className="mt-10 bg-black text-white py-3 w-40 block text-sm rounded-md" type="button" onClick={()=> append({})}>タスクを追加</button>
    </div>
  );
}
