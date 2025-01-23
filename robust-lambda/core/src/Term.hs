data Term
  = Var String          -- Variable (e.g., "x")
  | Lam String Term     -- Abstraction (λx. t)
  | App Term Term       -- Application (t1 t2)
  deriving (Show, Eq)