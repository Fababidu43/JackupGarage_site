import React from 'react';
import { ArrowLeft, FileText, Calendar, CreditCard, Shield, AlertTriangle, Phone, Mail } from 'lucide-react';

interface CGVProps {
  onBack: () => void;
}

const CGV: React.FC<CGVProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour au site</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-futuristic">
                Conditions Générales de Vente
              </h1>
              <p className="text-orange-100 font-tech">JACK Up Auto - Mécanicien à domicile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none">
          
          {/* Article 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
              Objet et champ d'application
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech">
                Les présentes conditions générales de vente s'appliquent à toutes les prestations de services mécaniques automobiles réalisées par JACK Up Auto, auto-entrepreneur spécialisé dans la réparation et l'entretien automobile à domicile.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mt-3">
                Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
              Services proposés
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-4">
                JACK Up Auto propose les services suivants à domicile :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech">
                <li>Vidange et entretien courant</li>
                <li>Réparation et remplacement du système de freinage</li>
                <li>Remplacement d'embrayage et volant moteur</li>
                <li>Remplacement du kit de distribution</li>
                <li>Réparation des suspensions et amortisseurs</li>
                <li>Diagnostic et autres réparations mécaniques</li>
              </ul>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
              Zone d'intervention
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                <strong>Zone standard (gratuite) :</strong> Rayon de 30 km autour de Monistrol-sur-Loire (43120)
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                <strong>Zone élargie :</strong> Jusqu'à 60 km selon la nature des travaux, avec supplément de 1€/km au-delà de 30 km
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                <strong>Zone Lyon :</strong> Intervention sur demande uniquement, nous contacter pour vérifier la faisabilité
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</div>
              Conditions d'intervention
            </h2>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed font-tech font-semibold">
                  Conditions obligatoires pour l'intervention :
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech">
                <li>Disposer d'un sol dur et plat (béton, bitume, pavés)</li>
                <li>Espace suffisant pour manœuvrer autour du véhicule</li>
                <li>Accès à un point d'eau si nécessaire</li>
                <li>Présence du client ou de son représentant</li>
                <li>Conditions météorologiques favorables (pas de pluie)</li>
              </ul>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</div>
              Devis et tarification
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Tout devis est gratuit et sans engagement. Il est valable 30 jours à compter de sa date d'émission.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les tarifs incluent la main-d'œuvre, les pièces de rechange et le déplacement dans la zone standard.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Toute intervention supplémentaire non prévue au devis initial fera l'objet d'un accord préalable du client.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">6</div>
              Modalités de paiement
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed font-tech font-semibold">
                  Moyens de paiement acceptés :
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech mb-4">
                <li>Espèces</li>
                <li>Chèque</li>
                <li>Virement bancaire</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-tech">
                Le paiement s'effectue à la fin de l'intervention, après validation des travaux par le client.
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">7</div>
              Garanties
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed font-tech font-semibold">
                  Garanties proposées :
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech">
                <li>Pièces neuves : garantie constructeur</li>
                <li>Main-d'œuvre : 3 mois ou 5 000 km</li>
                <li>Vidange : 1 mois ou 1 000 km</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-tech mt-4">
                La garantie ne s'applique qu'en cas de défaut de conformité ou de vice caché, et ne couvre pas l'usure normale des pièces.
              </p>
            </div>
          </section>

          {/* Article 8 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">8</div>
              Responsabilité et assurance
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                JACK Up Auto est couvert par une assurance responsabilité civile professionnelle.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Notre responsabilité est limitée aux dommages directs causés par nos interventions.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Le client reste responsable de son véhicule et doit s'assurer que celui-ci est en état de circuler après intervention.
              </p>
            </div>
          </section>

          {/* Article 9 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">9</div>
              Annulation et report
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Toute annulation doit être signalée au moins 24h à l'avance.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                En cas d'annulation tardive (moins de 24h), des frais de déplacement pourront être facturés.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Les interventions peuvent être reportées en cas de conditions météorologiques défavorables.
              </p>
            </div>
          </section>

          {/* Article 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">10</div>
              Protection des données
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les données personnelles collectées sont utilisées uniquement dans le cadre de la prestation de service.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              Contact
            </h2>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <a href="tel:+33629485339" className="text-orange-600 hover:text-orange-700 font-tech">
                      06 29 48 53 39
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:jackup-auto@outlook.fr" className="text-orange-600 hover:text-orange-700 font-tech">
                      jackup-auto@outlook.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Date de mise à jour */}
          <div className="text-center py-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-tech">
              <Calendar className="w-4 h-4" />
              <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGV;