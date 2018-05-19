export const LOAD_SCRIPT = 'editor/LOAD_SCRIPT'	

const initialState = {
  text: undefined
}

var inlineCode = `
class Test
{
	foo(count, radius)
	{
		if (radius == 0.0)
		{
			count++;
			console.log(radius);
		}
		else if (radius > 0.0)
		{
			count += 2;
			console.log(radius)
			if (radius > 5.0)
			{
				count += 5;
				console.log(radius);
			}
		}
		else
		{
		}
	}
}
`

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SCRIPT:
      return {
        ...state,
        text: inlineCode
      }

    default:
      return state
  }
}

export const loadScript = (url) => {
  return dispatch => {
    dispatch({
      type: LOAD_SCRIPT,
      url: url
    })
  }
}
