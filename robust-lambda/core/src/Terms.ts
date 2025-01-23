// Identity function: λx.x
const identity: Term = {
    type: "Lambda",
    param: "x",
    body: { type: "Var", name: "x" }
  };
  
  // Church numeral 2: λf.λx.f (f x)
  const churchTwo: Term = {
    type: "Lambda",
    param: "f",
    body: {
      type: "Lambda",
      param: "x",
      body: {
        type: "App",
        func: { type: "Var", name: "f" },
        arg: {
          type: "App",
          func: { type: "Var", name: "f" },
          arg: { type: "Var", name: "x" }
        }
      }
    }
  };
  
  // Application: (λx.x) y
  const app: Term = {
    type: "App",
    func: identity,  // Reference to the identity function
    arg: { type: "Var", name: "y" }
  };