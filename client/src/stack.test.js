class Stack {
	constructor() {
		this.top = -1;
		this.items = {};
	}
}

test("my stack is created empty", () => {
	const stack = new Stack();
	expect(stack.top).toBe(-1);
});
