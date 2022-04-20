import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// -------------------------------------
// model
// -------------------------------------
type FormInputs = {
	firstName: string,
	lastName: string,
	gender: string,
	age: number,
	work: string
}

const genderMap = new Map<string, string>([['1', '男性',], ['2', '女性'], ['3', '他']]);
const workMap = new Map<string, string>([['1', '死神代行'], ['2', '滅却師'], ['3', '学生']]);

export const Form = () => {

	// 送信データの型チェック
	// genericsで型を指定する(type FormInputs)
	const [submitData, setData] = useState<FormInputs>()

	// register / handleSubmitをuseFormで初期化
	// genericsで型を指定する
	const {
		register, handleSubmit
	} = useForm<FormInputs>()

	// フォーム送信時の型チェック
	// 引数に名前と型を指定
	const onSubmit = (data: FormInputs) => {
		setData(data)
	};

	return(
		<>
			<h1>React Hook Form</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					苗字
					{/*
						フォーム要素にスプレッドでregister関数を展開
						第一引数には input などのname属性（先にtype hogehoge = {} で定義）
					 */}
					<input type="text" {...register('lastName', { required: true })} />
				</label>
				<label>
					名前
					<input type="text" {...register('firstName', { required: true })} />
				</label>
				<label>
					性別
					<input type="radio" {...register('gender', { required: true })} value={1}/>男性
					<input type="radio" {...register('gender', { required: true })} value={2}/>女性
					<input type="radio" {...register('gender', { required: true })} value={3}/>Skip
				</label>

				<label>
					年齢
					<input type="number" {...register('age', { required: true })}/>
				</label>

				<label>
					性別
					<select {...register('work', {required: true})}>
						<option value="">選択してください</option>
						<option value="1">死神代行</option>
						<option value="2">滅却師</option>
						<option value="3">学生</option>
					</select>
				</label>

				<input type="submit" />
			</form>
			<h2>Send Data</h2>
			Caracter data is
			{submitData
				? `
					${submitData.lastName + submitData.firstName}
					(${genderMap.get(submitData.gender)})
					[${submitData.age}歳]
					${workMap.get(submitData.work)}
				`
				: 'Not send yet'
			}
		</>

	)
}