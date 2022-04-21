import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// -------------------------------------
// model
// -------------------------------------
type FormInputs = {
	projectTitle: string,
	taskTitle: string,
	category: string,
	tags: string[],
	workTime: string
}

// -------------------------------------
// 初期値を設定
// -------------------------------------
const defaultValues: FormInputs = {
	projectTitle: '1',
	taskTitle: '作業内容',
	category: '1',
	tags: ['1'],
	workTime: '1'
}

const projectMap = new Map<string, string>([['1', 'プロジェクトA'], ['2', 'プロジェクトB'], ['3', 'プロジェクトC']]);
const categoryMap = new Map<string, string>([['1', 'フロントエンド'], ['2', 'バックエンド'], ['3', 'インフラ'], ['4', 'デザイン']]);
const tagMap = new Map<string, string>([['1', 'TypeScript'], ['2', 'jQuery'], ['3', 'JavaScript'], ['4', 'PHP'], ['5', 'Laravel']]);

export const Form = () => {

	// 送信データの型チェック
	// genericsで型を指定する(type FormInputs)
	const [submitData, setData] = useState<FormInputs>()

	// register / handleSubmitをuseFormで初期化
	// genericsで型を指定する
	// 初期値をセットする場合useForm関数内でdefaultValuesオブジェクトに変数を指定する
	const {
		register, handleSubmit, formState:{ errors }
	} = useForm<FormInputs>({
		defaultValues: defaultValues
	})

	// フォーム送信時の型チェック
	// 引数に名前と型を指定
	const onSubmit = (data: FormInputs) => {
		setData(data)
		console.log(data);
	};

	return(
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					プロジェクト
					{/*
						フォーム要素にスプレッドでregister関数を展開
						第一引数には input などのname属性（先にtype hogehoge = {} で定義）
					 */}
					<select {...register('projectTitle', {
						required: {
							value: true,
							message: 'プロジェクトを選択してください',
						}
					})}>
						<option value="1">プロジェクトA</option>
						<option value="2">プロジェクトB</option>
						<option value="3">プロジェクトC</option>
						<option value="4">プロジェクトD</option>
					</select>
					{errors.projectTitle && <span className="error">{errors.projectTitle.message}</span>}
				</label>

				<label>
					作業内容
					<textarea {...register('taskTitle', {
						required: {
							value: true,
							message: '作業内容を入力してください',
						}
					})} />
					{errors.taskTitle && <span className="error">{errors.taskTitle.message}</span>}
				</label>

				<label>
					性別
					<input type="radio" {...register('category', { required: true })} value={1}/>フロントエンド
					<input type="radio" {...register('category', { required: true })} value={2}/>バックエンド
					<input type="radio" {...register('category', { required: true })} value={3}/>インフラ
					<input type="radio" {...register('category', { required: true })} value={4}/>デザイン
				</label>

				<label>
					<input type="checkbox" {...register('tags', { required: true })} value={1}/>TypeScript
				</label>
				<label>
					<input type="checkbox" {...register('tags', { required: true })} value={2}/>jQuery
				</label>
				<label>
					<input type="checkbox" {...register('tags', { required: true })} value={3}/>JavaScript
				</label>
				<label>
					<input type="checkbox" {...register('tags', { required: true })} value={4}/>PHP
				</label>
				<label>
					<input type="checkbox" {...register('tags', { required: true })} value={5}/>Laravel
				</label>

				<input type="submit" />
			</form>
			<h2>Send Data</h2>
			{submitData
				? <>
						<p>{projectMap.get(submitData.projectTitle)}</p>
						<p>{submitData.taskTitle}</p>
						<p>{categoryMap.get(submitData.category)}</p>
						{submitData.tags.map((tag, k) => {
							return(
								<p>{tagMap.get(tag)}</p>
							)})
						}
					</>
				: 'Not send yet'
			}
			<h3>Errors</h3>
		</>

	)
}