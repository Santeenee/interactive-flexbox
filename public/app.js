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
		spanCopied[i].addEventListener('animationend', () =>
			spanCopied[i].classList.remove('animate')
		)
	}
}

const changeCodeSnippet = (count, btnId, btnClass) => {
	codeSnippets[count].innerText = `${btnClass}: ${btnId};`
}

const copyToClipboard = codeSnippet => {
	if (!navigator.clipboard) {
		// Clipboard API not available
		codeSnippet.select()
		document.execCommand('copy')
	} else {
		navigator.clipboard
			.writeText(codeSnippet.innerText)
			.then(() => {
				console.log('Text copied to clipboard...')
			})
			.catch(err => {
				console.log('Something went wrong', err)
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

const chooseWhatToChange = (btnId, btnClass) => {
	switch (btnClass) {
		case 'flex-direction':
			changeFlexboxProperty(btnId, 0, 'flexFlow', 'parent')
			changeCodeSnippet(0, btnId, btnClass)
			break

		case 'justify-content':
			changeFlexboxProperty(btnId, 1, 'justifyContent', 'parent')
			changeCodeSnippet(1, btnId, btnClass)
			break

		case 'align-items':
			changeFlexboxProperty(btnId, 2, 'alignItems', 'parent')
			changeCodeSnippet(2, btnId, btnClass)
			break

		case 'combine-justify':
			changeFlexboxProperty(btnId, 3, 'justifyContent', 'parent')
			break

		case 'combine-align':
			changeFlexboxProperty(btnId, 3, 'alignItems', 'parent')
			break

		case 'input-number':
			changeFlexboxProperty(btnId, 4, 'flexGrow', 'child')
			break

		default:
			//console.log("this button doesn't have the required class...");
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
		chooseWhatToChange(btn.id, btn.className)
	})
})

inputs.forEach(input => {
	input.addEventListener('input', () => {
		chooseWhatToChange(input.id, input.className)
	})
})

codeSnippets.forEach(codeSnippet => {})

for (let i = 0; i < codeSnippets.length; i++) {
	codeSnippets[i].addEventListener('click', () => {
		copyToClipboard(codeSnippets[i])
		animateSpan(i)
	})
}
