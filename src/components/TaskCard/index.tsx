import React from 'react';
import { useFieldArray } from 'react-hook-form';


const projectLists = [
	{value: '1', name: 'プロジェクトA'},
	{value: '1', name: 'プロジェクトA'},
	{value: '1', name: 'プロジェクトA'},
	{value: '1', name: 'プロジェクトA'},
	{value: '1', name: 'プロジェクトA'},
	{value: '1', name: 'プロジェクトA'},
]

const workTimes = [
	0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6
]

const categories = [
	{value: '1', name: 'フロントエンド'},
	{value: '2', name: 'バックエンド'},
	{value: '3', name: 'インフラ'},
	{value: '4', name: 'デザイン'},
]

const tags = [
	{value: 'typescript', name: 'TypeScript'},
	{value: 'typescript', name: 'TypeScript'},
	{value: 'typescript', name: 'TypeScript'},
	{value: 'typescript', name: 'TypeScript'},
	{value: 'typescript', name: 'TypeScript'},
	{value: 'typescript', name: 'TypeScript'},
]

export const ProjectCard = ( {control, register, setValue, getValues, defaults }:any) => {

	const { fields, append, remove, prepend } = useFieldArray({
		control,
		name: 'tasks'
	});

	return(
		<>
			<ul>
				{fields.map((task, taskIndex) => {
					return(
						<li key={taskIndex}>
							<select {...register(`tasks[${taskIndex}].projectName`)}>
								<option value="">プロジェクトを選択</option>
								{projectLists.map((projectList, projectListIndex) => {
									return(
										<option key={projectListIndex} value={projectList.value}>{projectList.name}</option>
									)
								})}
							</select>
							<textarea {...register(`tasks[${taskIndex}].taskTitle`)} placeholder="作業内容を入力"></textarea>
							<select>
								<option value="">作業時間を選択</option>
								{workTimes.map((workTime, workTimeIndex) => {
									return(
										<option value={workTimeIndex}>{workTime}</option>
									)
								})}
							</select>
							<select>
								<option value="">作業カテゴリーを選択</option>
								{categories.map((category, categoryIndex) => {
									return(
										<option value={category.value}>{category.name}</option>
									)
								})}
							</select>
							{tags.map((tag, tagIndex) => {
								return(
									<>
										<input type="checkbox" value={tag.value} {...register(`tasks[${taskIndex}].tags[]`)} />{tag.name}
									</>
								)
							})}
							<div>
								<button type="button" onClick={() => remove(taskIndex)}>タスクを削除</button>
							</div>
						</li>
					)
				})}
			</ul>
			<button type="button" onClick={() => append({})}>タスクを追加</button>
		</>
	)
}