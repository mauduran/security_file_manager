def XGCD(a, b):
    v = [a,b];
    x = [1,0];
    y = [0,1];

    i = 1;

    while v[i]:
        i ^= 1;
        q = v[i] // v[i^1];
        v[i] = v[i] - q*v[i^1];
        x[i] = x[i] - q*x[i^1];
        y[i] = y[i] - q*y[i^1];
    i ^= 1;

    return x[i], y[i], v[i];

def barrett(T, P, b, k):
    print("BARRET:")
    print("   T = " + str(hex(T)))
    MIU = b**(2*k) // P
    print("   MIU = " + str(hex(MIU)))
    Q1 = T // b**(k-1)
    print("   Q1 = " + str(hex(Q1)))
    Q2 = Q1 * MIU
    print("   Q2 = " + str(hex(Q2)))
    Q = Q2 // b**(k+1)
    print("   Q = " + str(hex(Q)))
    R1 = T % b**(k+1)
    print("   R1 = " + str(hex(R1)))
    R2 = Q * P
    print("   R2 = " + str(hex(R2)))
    R3 = R2 % b**(k+1)
    print("   R3 = " + str(hex(R3)))
    R = R1 - R3
    print("   R = " + str(hex(R)))
    print("   Is R < 0? "+str(R<0))
    return R;

def mont(A, B, P, R, b, k):
    RES_A = barrett(A*R, P, b, k)
    print("RES_A = " + str(RES_A))
    RES_B = barrett(B*R, P, b, k)
    print("RES_B = " + str(RES_B))
    P_INV = -(XGCD(P, R)[0]) % R
    T = RES_A * RES_B
    print("T = " + str(hex(T)))
    Q1 = T * P_INV
    print("Q1 = " + str(hex(Q1)))
    Q = Q1 % R
    print("Q = " + str(hex(Q)))
    U1 = Q*P
    print("U1 = " + str(hex(U1)))
    U2 = T + U1
    print("U2 = " + str(hex(U2)))
    U = U2 // R
    print("U  = " + str(U))
    print("U  = " + str(hex(U)))
    print("   Is U > P? "+str(U>P))
    return U
    
def mul_mont(A, B, P, R):
    RES_A = barrett(A, P)
    print("A*R mod P = " + str(hex(RES_A)))
    C = mont(RES_A, B, P, R)
    print("mont(RES_A, B) = " + str(hex(C)))


A = 0xb2cb88a2c7b617aeb75d44eee15affc665ca0674cb07e8cdd77f0a193f7d2186
B = 0x2d993abbd6fe1f8681dbe2eace2d284869b098405cb39dae34a290ab959e0f57
P = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43
R = 2**256
b = 2**32
k = 8
barrett(A*B, P, b, k)
print(hex(A*B % P))
#mont(A, B, P, R, b, k)

print("\n")

A = 1528
B = 1657
P = 2113
R = 2**12
b = 2**4
k = 3
#barrett(B*R, P, b, k)
#print(hex(B*R % P))
#mont(A, B, P, R, b, k)
