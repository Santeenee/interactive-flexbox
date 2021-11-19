const buttons = document.querySelectorAll('button')
const codeSnippets = document.querySelectorAll('.code-snippet')
const inputs = document.querySelectorAll('input[type="number"]')
const btnChangeValue = document.querySelectorAll('button.change-value')

const flexBox = document.querySelectorAll('.flex-box')
const innerBoxes = document.querySelectorAll('.inner-box')

const spanCopied = document.querySelectorAll('.copied')

const pTagPlatformDependent = document.querySelector('p#platformDependent')

/*
███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

const animateInput = i => {
	if (!inputs[i].classList.contains('animate-input')) {
		inputs[i].classList.add('animate-input')
		//
		inputs[i].addEventListener('animationend', () => {
			inputs[i].classList.remove('animate-input')
		})
	}
}

const changeValueInInputNumber = (btnClass0, i) => {
	if (i === 0 || i === 1) i = 0
	else if (i === 2 || i === 3) i = 1
	else if (i === 4 || i === 5) i = 2
	else console.log(`index out of something... i=${i}`)

	//creating (and firing the event 'input' with dispachEvent())
	//which allows the innerBoxes to grow accordingly
	//and the codeSnippet thing to work
	const event = new Event('input', {
		view: window,
		bubbles: true,
		cancelable: true,
	})

	if (btnClass0 === 'add') {
		if (inputs[i].value != 99) {
			inputs[i].value++
			inputs[i].dispatchEvent(event)
		} else {
			animateInput(i)
			// inputs[i].value = 99
		}
	} else if (btnClass0 === 'remove') {
		if (inputs[i].value != 1) {
			inputs[i].value--
			inputs[i].dispatchEvent(event)
		} else {
			animateInput(i)
			// inputs[i].value = 1
		}
	} else {
		console.log(`wait what:\nclass:"${btnClass0}"\nindex:${i}\n`)
	}
}

const changeParagraphForMacOsUsers = platform => {
	console.log(`You are using this platform: "${platform}"`)
	//
	if (
		pTagPlatformDependent.innerText.includes('SHIFT') &&
		platform.toLowerCase().includes('mac')
	) {
		pTagPlatformDependent.innerHTML =
			'Use <b>TAB</b> or <b>OPTION+TAB</b> to navigate through this website, confirm a choice with <b>ENTER</b>'
		//
	} else if (navigator.userAgentData) {
		if (
			navigator.userAgentData
				.mobile /*seems like it works only on some android phones...*/ ||
			platform.includes('iP')
		) {
			//iPhone, iPad
			pTagPlatformDependent.remove()
		}
	}
}

const checkPlatform = () => {
	//
	if (
		navigator.userAgentData &&
		navigator.userAgentData.platform != '' &&
		navigator.userAgentData.platform != undefined
	) {
		//
		let platform = navigator.userAgentData.platform
		changeParagraphForMacOsUsers(platform)
		//
	} else if (
		navigator.platform &&
		navigator.platform != '' &&
		navigator.platform != undefined
	) {
		//
		let platform = navigator.platform
		changeParagraphForMacOsUsers(platform)
		//
	} else {
		console.log(
			'could not retrieve platform name ("Windows/win32","macOS/MacIntel", etc)'
		)
	}
}

const animateSpan = i => {
	if (!spanCopied[i].classList.contains('animate')) {
		spanCopied[i].classList.add('animate')
		//
		spanCopied[i].addEventListener('animationend', () => {
			spanCopied[i].classList.remove('animate')
			//if an error is thrown reset the innerText to 'Copied!'
			if (spanCopied[i].innerText.includes('Error')) {
				console.log(`${i + 1}° span includes "Error"`)
				spanCopied[i].innerText = 'Copied!'
				spanCopied[i].style.color = 'green'
			}
		})
	}
}

const changeCodeSnippet = (count, btnId, btnClass) => {
	//
	if (btnClass === 'input-number') {
		let inputValue = inputs[count].value
		if (inputValue == '') inputValue = 1

		codeSnippets[4].innerText = `flex-grow: ${inputValue};`
	} else {
		codeSnippets[count].innerText = `${btnClass}: ${btnId};`
	}

	//Canceling animation when possible
	if (spanCopied[count].classList.contains('animate')) {
		spanCopied[count].classList.remove('animate')
	}
}

const copyToClipboard = (codeSnippet, i) => {
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(codeSnippet.innerText)
			.then(() => {
				console.log(`[${codeSnippet.innerText}] copied to clipboard!`)
				animateSpan(i)
			})
			.catch(err => {
				console.log('Coping text to clipboard failed:\n', err)
				//spanCopied[i].style.right = '-9.5rem'
				spanCopied[i].style.backgroundColor = 'hsla(0, 0%, 100%, 50%)'
				spanCopied[i].innerText = 'Error'
				spanCopied[i].style.color = 'hsl(0 100% 30%)'
				animateSpan(i)
			})
	} else {
		// Clipboard API not available
		codeSnippet.select()
		document.execCommand('copy')
		animateSpan(i)
	}
}

const changeFlexboxProperty = (btnId, count, flexProperty, whatDiv) => {
	if (whatDiv === 'parent') {
		flexBox[count].style[flexProperty] = btnId
		//
	} else if (whatDiv === 'child') {
		//
		for (let i = 0; i < inputs.length; i++) {
			//
			if (inputs[i].value > 99 || inputs[i].value < 1) {
				//console.log(`invalid input[${i}] --> ${inputs[i].value}`);
				inputs[i].value = ''
			}
			innerBoxes[i].style.flexGrow = inputs[i].value
		}
	} else {
		console.log(
			`the var whatDiv -> "${whatDiv}" doesn't match the required values`
		)
	}
}

//*this function handles button and input number actions
const chooseWhatToChange = btn => {
	let btnId = btn.id
	let btnClass = btn.classList

	switch (btnClass[0]) {
		case 'flex-direction':
			changeFlexboxProperty(btnId, 0, 'flexFlow', 'parent')
			changeCodeSnippet(0, btnId, btnClass)
			break

		case 'justify-content':
			if (!btnClass.contains('combine')) {
				changeFlexboxProperty(btnId, 1, 'justifyContent', 'parent')
				changeCodeSnippet(1, btnId, btnClass)
			} else {
				changeFlexboxProperty(btnId, 3, 'justifyContent', 'parent')
				changeCodeSnippet(3, btnId, btnClass[0])
			}
			break

		case 'align-items':
			if (btnClass.contains('combine')) {
				changeFlexboxProperty(btnId, 3, 'alignItems', 'parent')
				changeCodeSnippet(3, btnId, btnClass[0])
			} else {
				changeFlexboxProperty(btnId, 2, 'alignItems', 'parent')
				changeCodeSnippet(2, btnId, btnClass)
			}
			break

		case 'input-number':
			changeFlexboxProperty(btnId, 4, 'flexGrow', 'child')

			//*this works
			for (let j = 1; j < 4; j++) {
				//if last char of btnId string matches J value
				if (parseInt(btnId[btnId.length - 1]) === j) {
					//then
					changeCodeSnippet(j - 1, btnId, btnClass[0])
				}
			}

			//*this works too
			// if (btnId === 'numberGrow1') changeCodeSnippet(0, btnId, btnClass[0])
			// else if (btnId === 'numberGrow2') changeCodeSnippet(1, btnId, btnClass[0])
			// else if (btnId === 'numberGrow3') changeCodeSnippet(2, btnId, btnClass[0])
			break

		default:
			if (
				!btnClass.contains('code-snippet') &&
				!btnClass.contains('change-value') &&
				!btnClass.contains('add') &&
				!btnClass.contains('remove')
			)
				console.log(
					`wrong class -> "${btnClass}" chooseWhatToChange() doesn't know what to do...`
				)
			break
	}
}

/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗     ██╗███████╗████████╗███████╗███╗   ██╗███████╗██████╗ ███████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝███████╗
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗╚════██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ███████╗██║███████║   ██║   ███████╗██║ ╚████║███████╗██║  ██║███████║
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝
*/

buttons.forEach(btn => {
	btn.addEventListener('click', () => {
		chooseWhatToChange(btn)
	})
})

inputs.forEach(input => {
	input.addEventListener('input', () => {
		chooseWhatToChange(input)
	})
})

//copy to clipboard from code snippets button
for (let i = 0; i < codeSnippets.length; i++) {
	codeSnippets[i].addEventListener('click', () => {
		copyToClipboard(codeSnippets[i], i)
	})
}

//spin button thing that i do not understand completely. why meeeee
for (let i = 0; i < btnChangeValue.length; i++) {
	//keep var
	var mouseDownID = -1 //Global ID of mouse down interval
	const mouseDown = event => {
		if (mouseDownID == -1)
			//change value of mouseDownID prevent multimple loops!
			mouseDownID = setInterval(action, 100 /*execute every 100ms*/)
	}
	const mouseUp = event => {
		if (mouseDownID != -1) {
			//Only stop if exists
			clearInterval(mouseDownID)
			mouseDownID = -1
		}
	}
	const action = () => {
		changeValueInInputNumber(btnChangeValue[i].classList[0], i)
	}
	//Assign events
	btnChangeValue[i].addEventListener('mousedown', mouseDown)
	btnChangeValue[i].addEventListener('touchstart', mouseDown)

	btnChangeValue[i].addEventListener('mouseup', mouseUp)
	btnChangeValue[i].addEventListener('touchend', mouseUp)

	btnChangeValue[i].addEventListener('mouseout', mouseUp)
	// btnChangeValue[i].addEventListener('touchcancel', mouseUp)

	btnChangeValue[i].addEventListener('click', action)
}

// -------------
// function call
// -------------

checkPlatform()
