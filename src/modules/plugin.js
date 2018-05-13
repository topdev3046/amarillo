

export default (babel) => {
    var t = babel.types
    return {
        visitor: {
            ExpressionStatement: function(path) {
                var call = path.node.expression
                if (t.isCallExpression(call))
                {
                    var props = [];
                    props.push(
                        t.Iden,
                        t.booleanLiteral(true)
                      );
                    path.replaceWith(
                        t.ExpressionStatement(
                            t.JSXElement(
                                t.JSXOpeningElement(
                                    t.JSXIdentifier('MethodInvocationGesture'), [], true
                                ), null, [], true
                            )
                        )
                    )
                }
            }
        }
    }
}
