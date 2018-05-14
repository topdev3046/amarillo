import * as t from 'babel-types'

var children = []
var currentMethod;

const updateClassMethod= {
    ClassMethod(path) {
        console.log("path:", path.node)
        var methodBody = path.node.body
        currentMethod = t.JSXElement(
            t.JSXOpeningElement(
                t.JSXIdentifier('MethodInvocationGesture'), [], true
            ), null, [], true
        )
        children.push(currentMethod)
        path.remove()
    }
  };

export default (babel) => {
    var currentClass;
    var t = babel.types
    return {
        visitor: {
            ClassDeclaration: function(path) {
                var classBody = path.node.body
                var methods = classBody.body
                methods.forEach(element => {
                    console.log("method:", element)
                });
                path.traverse(updateClassMethod, {methods})
                currentClass = t.JSXElement(
                    t.JSXOpeningElement(
                        t.JSXIdentifier('ClassGesture'), [], true
                    ), null, children, false
                )
                path.replaceWithMultiple(
                    [
                        t.ExpressionStatement(currentClass)
                    ].concat(methods)
                )
            },
            ExpressionStatement: function(path) {
                var call = path.node.expression
                if (t.isCallExpression(call))
                {
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
