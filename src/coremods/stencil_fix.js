function initializeCoreMod() {
    return {
        'stencil_fix': {
            'target': {
                'type': 'CLASS',
                'name': 'net.minecraft.client.shader.Framebuffer'
            },
            'transformer': function (classNode) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var InsnList = Java.type('org.objectweb.asm.tree.InsnList');
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                var methods = classNode.methods;
                for (var i = 0; i < methods.size(); i++) {
                    var m = methods.get(i);
                    if (m.name == 'enableStencil') {
                        var list = new InsnList();
                        if (m.desc.endsWith('Z')) {
                            list.add(new InsnNode(Opcodes.ICONST_0));
                            list.add(new InsnNode(Opcodes.IRETURN));
                        } else {
                            list.add(new InsnNode(Opcodes.RETURN));
                        }
                        m.instructions.clear();
                        m.instructions.add(list);
                        m.tryCatchBlocks.clear();
                        if (m.localVariables) m.localVariables.clear();
                    }
                }
                return classNode;
            }
        }
    };
}
