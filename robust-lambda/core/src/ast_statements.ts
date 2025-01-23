// AST for untyped lambda calculus
type Term =
  // Variable (e.g., "x", "y")
  | { type: "Var"; name: string }
  // Lambda abstraction (λx. t)
  | { type: "Lambda"; param: string; body: Term }
  // Function application (t1 t2)
  | { type: "App"; func: Term; arg: Term };