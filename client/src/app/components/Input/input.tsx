interface InputComponent{
    labelName:string;
    labelType:string;
    InputType :string,
    icon:string;
    type:string;
    placeholder:string;
    email:boolean
}

export default function Input( {labelName,labelType,InputType,Icon,type,placeholder}:InputComponent){
    return(
        <>
            <div>
              <label htmlFor={labelType} className="block text-sm font-medium text-gray-700 mb-2">
                {labelName}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type={InputType}
                  id="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={placeholder}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
        </>
    )
}