import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TaskCard } from '@components/TaskCard';

// -------------------------------------
// model
// -------------------------------------
type IPosts = {
  postDate: string,
  projects: [
    {
      projectTitle: string,
      tasks: [
        {
          taskTitle: string,
          category: string
        }
      ]
    }
  ]
}

// -------------------------------------
// 初期値を設定
// -------------------------------------
const defaultValues: IPosts = {
  postDate: '2020-12-31',
  projects: [
    {
      projectTitle: 'プロジェクトタイトル',
      tasks: [
        {
          taskTitle: '作業内容',
          category: '作業カテゴリ',
        }
      ]
    }
  ]
}

// const projectMap = new Map<string, string>([['1', 'プロジェクトA'], ['2', 'プロジェクトB'], ['3', 'プロジェクトC']]);
// const categoryMap = new Map<string, string>([['1', 'フロントエンド'], ['2', 'バックエンド'], ['3', 'インフラ'], ['4', 'デザイン']]);
// const tagMap = new Map<string, string>([['1', 'TypeScript'], ['2', 'jQuery'], ['3', 'JavaScript'], ['4', 'PHP'], ['5', 'Laravel']]);

export const Form = () => {

  const data = {
    postDate: '2020-12-31',
    projects: [
      {
      projectTitle: 'プロジェクトタイトル',
        tasks: [
          {
            taskTitle: '作業内容',
            category: '作業カテゴリ',
          }
        ]
      }
    ]
  };
  // 送信データの型チェック
  // genericsで型を指定する(type FormInputs)
  const [submitData, setData] = useState<IPosts>()

  // register / handleSubmitをuseFormで初期化
  // genericsで型を指定する
  // 初期値をセットする場合useForm関数内でdefaultValuesオブジェクトに変数を指定する
  const {
    control, register, handleSubmit, formState:{ errors }, getValues, setValue
  } = useForm({
    defaultValues: { posts: data }
  });

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'posts.projects'
  });

  // フォーム送信時の型チェック
  // 引数に名前と型を指定
  const onSubmit = (data: any) => {
    setData(data);
  };

  return(
    <>
      <form className="p-8" onSubmit={handleSubmit<IPosts>(onSubmit)}>
        <input
          className="block w-40 mb-4 rounded-md bg-slate-100 border-none mb-10 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="date"
          {...register(`posts.postDate`, {
          required: {
            value: true,
            message: '入力してください'
          }
        })} />
        <div className="space-y-10">
        {fields.map((project, projectIndex) => {
          return(
            <div className="relative p-6 rounded-sm bg-slate-50 shadow-md" key={projectIndex}>
              <label className="flex w-full text-xs items-center">
                <div className="w-96">
                  <input
                    type="text"
                    className="block w-full rounded-md border-none bg-white mb-5 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register(`posts.projects.${projectIndex}.projectTitle`, {
                      required: {
                        value: true,
                        message: 'プロジェクトを選択してください',
                      }
                    })}
                  />
                </div>
              </label>
              <TaskCard projectIndex={projectIndex} {...{ control, register }} />
              <button
                className="absolute top-0 right-0 translate-x-2/4 -translate-y-1/2"
                type="button"
                onClick={() => remove(projectIndex)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          )
        })}
        </div>
        <div className="mt-10 inline-flex space-x-4">
          <button className="text-xs block w-24 py-3 bg-emerald-100 text-gray-800 rounded-sm shadow-md" type="button" onClick={()=> {
            setValue('posts.projects', [
              ...getValues().posts.projects,
              {
                projectTitle: 'プロジェクト名',
                tasks: [
                  {
                    taskTitle: 'タスク名',
                    category: 'カテゴリー'
                  }
                ]
              }
            ])
          }}>追加</button>
          <button className="text-xs block w-24 py-3 bg-emerald-800 rounded-sm shadow-md text-white" type="submit">送信</button>
        </div>
      </form>
    </>

  )
}
