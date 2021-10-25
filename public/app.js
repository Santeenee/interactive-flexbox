const buttons = document.querySelectorAll('button')
const codeSnippets = document.querySelectorAll('.code-snippet')
const inputs = document.querySelectorAll('input[type="number"]')

const flexBox = document.querySelectorAll('.flex-box')
const innerBoxes = document.querySelectorAll('.inner-box')

const spanCopied = document.querySelectorAll('.copied')

/*
███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

const animateSpan = i => {
	if (!spanCopied[i].classList.contains('animate')) {
		spanCopied[i].classList.add('animate')
		spanCopied[i].addEventListener('animationend', () => {
			spanCopied[i].classList.remove('animate')
			//if an error is thrown reset the innerText to 'Copied!'
			if (spanCopied[i].innerText.includes('Error')) {
				console.log('includes "Error"')
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
	if (!navigator.clipboard) {
		// Clipboard API not available
		codeSnippet.select()
		document.execCommand('copy')
		animateSpan(i)
	} else {
		navigator.clipboard
			.writeText(codeSnippet.innerText)
			.then(() => {
				//lol
				//throw new Error()
				console.log(`[${codeSnippet.innerText}] copied to clipboard!`)
				animateSpan(i)
			})
			.catch(err => {
				console.log('Something went wrong', err)
				//spanCopied[i].style.right = '-9.5rem'
				spanCopied[i].style.backgroundColor = 'hsla(0, 0%, 100%, 50%)'
				spanCopied[i].innerText = 'Error'
				spanCopied[i].style.color = 'hsl(0 100% 30%)'
				animateSpan(i)
			})
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
		console.log('we have a problem here...')
	}
}

//this also handles input number
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
			if (!btnClass.contains('combine')) {
				changeFlexboxProperty(btnId, 2, 'alignItems', 'parent')
				changeCodeSnippet(2, btnId, btnClass)
			} else {
				changeFlexboxProperty(btnId, 3, 'alignItems', 'parent')
				changeCodeSnippet(3, btnId, btnClass[0])
			}
			break

		case 'input-number':
			changeFlexboxProperty(btnId, 4, 'flexGrow', 'child')

			if (btnId === 'numberGrow1') changeCodeSnippet(0, btnId, btnClass[0])
			else if (btnId === 'numberGrow2') changeCodeSnippet(1, btnId, btnClass[0])
			else if (btnId === 'numberGrow3') changeCodeSnippet(2, btnId, btnClass[0])
			break

		default:
			if (!btnClass.contains('code-snippet'))
				console.log(`wrong class... ${btnClass}`)
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

for (let i = 0; i < codeSnippets.length; i++) {
	codeSnippets[i].addEventListener('click', () => {
		copyToClipboard(codeSnippets[i], i)
	})
}
