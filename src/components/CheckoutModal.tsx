import React, { useState } from 'react';
import { Course, Ebook, User } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  X, 
  ArrowRight,
  Clock,
  AlertCircle
} from 'lucide-react';

interface CheckoutModalProps {
  product: Course | Ebook;
  currentUser: User | null;
  onClose: () => void;
  onPaymentSuccess: (product: Course | Ebook) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  currentUser,
  onClose,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'paypal'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Form fields
  const [cardName, setCardName] = useState(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('824');
  const [installments, setInstallments] = useState(1);
  const [buyerEmail, setBuyerEmail] = useState(currentUser?.email || '');

  const isCourse = 'modules' in product;
  const price = product.price;

  // Simulated dynamic Pix key
  const pixKey = `00020126580014br.gov.bcb.pix0136patrick.ramon.crp09@instituto.com.br520400005303986540${price.toFixed(2)}5802BR5913PATRICK RAMON6009GOIANIA62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 1.6s secure authorization flow
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Trigger instant automatic unlock
      onPaymentSuccess(product);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#101B30] via-[#1B2A4A] to-[#24355A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#B38E5D]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#B38E5D] font-bold">
                Checkout Seguro · Criptografia 256-Bit
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold">
                {isSuccess ? 'Matrícula Confirmada!' : 'Finalizar Aquisição de Acesso'}
              </h2>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body with scroll */}
        <div className="overflow-y-auto flex-1">
        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 animate-in zoom-in">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Pagamento Aprovado Instantaneamente
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A]">
                Seja muito bem-vindo ao curso!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Seu acesso ao <strong className="text-slate-800">{product.title}</strong> foi liberado integralmente na sua conta. O recibo oficial com CNPJ foi emitido.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Produto Liberado:</span>
                <span className="font-semibold text-slate-800">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor Pago:</span>
                <span className="font-bold text-emerald-700">R$ {price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status no Portal:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Acesso Imediato Liberado
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#1B2A4A] hover:bg-[#101B30] text-white font-bold text-sm rounded-xl shadow-lg transition-transform transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>{isCourse ? 'Acessar Aulas no Portal' : 'Abrir E-book no Visualizador'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 space-y-6">
            
            {/* Order Summary Strip */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B38E5D]">
                  {isCourse ? 'Curso com Certificado' : 'E-book Digital Integrado'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#1B2A4A] line-clamp-1">
                  {product.title}
                </h4>
                <div className="text-[11px] text-slate-500">
                  Acesso Vitalício · Patrick Ramon CRP 09|22010
                </div>
              </div>
              <div className="text-right shrink-0">
                {product.originalPrice && (
                  <div className="text-[11px] text-slate-400 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </div>
                )}
                <div className="text-xl font-bold font-serif text-[#1B2A4A]">
                  R$ {price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Forma de Pagamento:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'pix'
                      ? 'border-[#B38E5D] bg-amber-50/50 text-[#1B2A4A] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#B38E5D]" />
                  <span>PIX Instantâneo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-[#B38E5D] bg-amber-50/50 text-[#1B2A4A] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#B38E5D]" />
                  <span>Cartão de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'paypal'
                      ? 'border-[#B38E5D] bg-amber-50/50 text-[#1B2A4A] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold text-[#003087]">Pay<span className="text-[#0079C1]">Pal</span></span>
                  <span className="text-[10px]">1-Clique</span>
                </button>
              </div>
            </div>

            {/* PIX Flow */}
            {paymentMethod === 'pix' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
                  {/* Dynamic PIX QR Code SVG */}
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200 mb-3">
                    <svg viewBox="0 0 120 120" className="w-32 h-32">
                      <rect width="120" height="120" fill="#ffffff" />
                      {/* Corner markers */}
                      <rect x="10" y="10" width="30" height="30" fill="#1B2A4A" />
                      <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                      <rect x="20" y="20" width="10" height="10" fill="#1B2A4A" />

                      <rect x="80" y="10" width="30" height="30" fill="#1B2A4A" />
                      <rect x="85" y="15" width="20" height="20" fill="#ffffff" />
                      <rect x="90" y="20" width="10" height="10" fill="#1B2A4A" />

                      <rect x="10" y="80" width="30" height="30" fill="#1B2A4A" />
                      <rect x="15" y="85" width="20" height="20" fill="#ffffff" />
                      <rect x="20" y="90" width="10" height="10" fill="#1B2A4A" />

                      {/* Random aesthetic QR blocks */}
                      <rect x="50" y="20" width="10" height="10" fill="#1B2A4A" />
                      <rect x="65" y="15" width="8" height="15" fill="#B38E5D" />
                      <rect x="50" y="50" width="20" height="20" fill="#1B2A4A" />
                      <rect x="25" y="55" width="15" height="10" fill="#B38E5D" />
                      <rect x="85" y="60" width="15" height="15" fill="#1B2A4A" />
                      <rect x="75" y="90" width="10" height="20" fill="#B38E5D" />
                      <rect x="95" y="85" width="15" height="10" fill="#1B2A4A" />
                      <rect x="55" y="85" width="12" height="15" fill="#1B2A4A" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>QRCode expira em 14:59 min · Compensação imediata</span>
                  </div>

                  {/* Copy Pix Key */}
                  <div className="w-full flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-xl">
                    <input
                      type="text"
                      readOnly
                      value={pixKey}
                      className="w-full text-[11px] font-mono text-slate-500 bg-transparent px-2 truncate focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3 py-1.5 bg-[#1B2A4A] hover:bg-[#101B30] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg transition-transform transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Confirmando recebimento no Banco Central...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simular Confirmação do Pix (Liberação Instantânea)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Credit Card Flow */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo no Cartão:
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ex: Dra. Camila Alencar"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número do Cartão:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden pr-10"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Validade (MM/AA):
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CVC / CVV:
                    </label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parcelamento:
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#B38E5D] focus:outline-hidden bg-white"
                  >
                    <option value={1}>1x de R$ {price.toFixed(2)} (Sem juros)</option>
                    <option value={3}>3x de R$ {(price / 3).toFixed(2)} (Sem juros)</option>
                    <option value={6}>6x de R$ {(price / 6).toFixed(2)} (Sem juros)</option>
                    <option value={12}>12x de R$ {((price * 1.08) / 12).toFixed(2)}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-[#1B2A4A] hover:bg-[#101B30] text-white font-bold text-sm rounded-xl shadow-lg transition-transform transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processando autorização segura...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#B38E5D]" />
                      <span>Pagar R$ {price.toFixed(2)} e Liberar Acesso</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* PayPal Flow */}
            {paymentMethod === 'paypal' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-600">
                  Você será redirecionado com segurança para o ambiente do PayPal para autorizar a compra em 1 clique.
                </p>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="w-full py-3.5 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Autenticando via PayPal...</span>
                  ) : (
                    <span>Continuar com PayPal Checkout</span>
                  )}
                </button>
              </div>
            )}

            {/* Security Footer Notice */}
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantia de 7 dias incondicional</span>
              </span>
              <span>·</span>
              <span>Nota Fiscal Automática</span>
            </div>

          </div>
        )}
        </div>

      </div>
    </div>
  );
};
