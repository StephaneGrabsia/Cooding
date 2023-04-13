def f(x):
 return x**2
test_input = [0, 1, 2, 3, 4, 5]
correct_output = [0, 1, 4, 9, 16, 25]
output, test = [], 0
for input in test_input:
   output.append(f(input))
print(output)