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
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les présentes Conditions Générales de Vente s'appliquent à toutes les ventes conclues par la société JACK UP AUTO auprès de ses clients.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Conformément à la règlementation en vigueur, les présentes Conditions Générales de Vente sont systématiquement communiquées sans délai à tout client qui en fait la demande.
              </p>
            </div>
          </section>

          {/* Article 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</div>
              Devis et diagnostic
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                JACK UP AUTO s'engage à fournir un devis gratuit selon les demandes, les besoins et les informations données par le client.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                S'il advient que le devis est incomplet ou ne répond pas aux attentes du consommateur, il lui en sera fourni un nouveau en remplacement du premier.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Dans le cas où est nécessité un diagnostic technique pour établir le devis, ledit diagnostic sera facturé de manière forfaitaire en vigueur affiché et déductible uniquement sur des actes issus du devis et réalisés par JACK UP AUTO. Ce montant forfaitaire inclut la prise en charge du véhicule dans un cadre de diagnostic et tout acte technique réalisé en supplément sera facturé selon le tarif en vigueur affiché avec l'accord du client.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Tout devis a une validité de 1 mois à compter de sa date d'émission.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</div>
              Conditions d'intervention
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client et le garagiste fixent la date et l'heure de l'intervention ensemble ; le garagiste se réserve le droit de différer ou d'annuler le créneau et de choisir avec le client une nouvelle date et plage horaire pour la même intervention.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                JACK UP AUTO s'engage à annoncer au client l'annulation ou le report de la prestation au minimum la veille, sauf cas de force majeur tel qu'un incident technique ou un souci lié au personnel.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Le client doit impérativement prévenir le garage au minimum 24 heures avant l'intervention prévue s'il ne peut honorer le rendez-vous, sauf cas de force majeure. A défaut, un déplacement forfaitaire de 50 euros sera facturé en cas d'absence du client au moment du rendez vous.
              </p>
            </div>
          </section>

          {/* Article 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</div>
              Durée de l'intervention
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                A compter de la finalisation de la commande et de l'heure de la prestation fixée librement entre le consommateur et le garagiste, la durée de la prestation sur le véhicule est fixée selon les prestations et actes techniques prévus à la réalisation.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Ces durées sont calculées en fonction des indications et préconisations fournies par le constructeur. La responsabilité de JACK UP AUTO ne peut ainsi aucunement être recherchée en cas de dépassement raisonnable de la durée de l'intervention fournie au préalable.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client s'engage auprès de JACK UP AUTO à respecter les horaires de l'intervention et être présent à son démarrage afin de confier au personnel la clé et les papiers du véhicule. Il s'engage également à être présent à l'issue de l'intervention pour valider les actes techniques effectués, régler le montant de la prestation et récupérer la clé de son véhicule ainsi que ses documents.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                La signature du client, ou de la personne mandatée, présente sur le bon de réparation ou de la remise de la facture a pour valeur l'accord du client de la bonne exécution de l'acte technique.
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</div>
              Changement d'adresse ou d\'heure d'intervention
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client peut tout à fait et à tout moment déplacer l'heure, le jour et l'adresse de la prestation sous réserve des créneaux disponibles du garage en le contactant par téléphone ou SMS 24 heures minimum avant l'heure prévue de l'intervention.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Le garage auto peut modifier le jour et le créneau horaire de l'intervention dans un délai de 12 heures avant son début. Un nouveau créneau sera fixé par téléphone et un mail ou SMS sera envoyé au client en qualité de confirmation.
              </p>
            </div>
          </section>

          {/* Article 5 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</div>
              Tarifs
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les tarifs des forfaits main d'œuvre de JACK UP AUTO sont consultables sur notre site internet à l'adresse www.jackup-auto.fr. Nous pouvons également vous les communiquer par e-mail via l'adresse contact@jackup-auto.fr ou par téléphone au 0629485339.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les tarifs sont susceptibles d'être modifiés sans notification au préalable. Les tarifs sont basés sur des forfaits mains d'œuvre et nom des tarifs horaire. S'il arrive qu'une intervention soit plus longue ou plus courte que le temps indiqué, elle ne donnera ainsi pas lieu à une modification du tarif.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Toute validation de devis ou de prestation pourra être accompagnée d'une demande d'acompte si le garagiste le juge nécessaire.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">6</div>
              Frais de déplacement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les frais de déplacement des interventions réalisées sont compris dans les tarifs. En cas d'intervention spéciale nécessitant des frais de déplacement plus élevés qu'à l'ordinaire, JACK UP AUTO se réserve le droit d'appliquer des frais supplémentaires, communiqués au client avant la prestation.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Les zones d'interventions accompagnées de frais de déplacement supplémentaires sont consultables sur notre site internet à l'adresse www.jackup-auto.fr.
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">7</div>
              Garantie
            </h2>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les illustrations et les photographies présentes sur le site www.jackup-auto.fr ne détiennent aucune valeur contractuelle et n'engage en rien la responsabilité de JACK UP AUTO.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Conformément aux dispositions légales en vigueur, le client bénéficie de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech mb-4">
                <li>La garantie constructeur</li>
                <li>La garantie légale de conformité</li>
                <li>La garantie légale des vices cachés</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                La garantie légale de conformité ne peut en revanche pas s'appliquer dans le cas où le consommateur a connaissance du défaut au moment de l'achat ou si le défaut est la conséquence de matériaux ajoutés par lui-même ou d'actes perpétrés par lui-même.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                La garantie légale des vices cachés s'applique dans le cas où le défaut est caché, qu'il rende impropre le véhicule ou le produit à l'usage auquel on le destine et qui doit être en existence au moment de la date d'achat. Cette garantie a pour but de prémunir le consommateur contre les vices cachés d'un produit. C'est à lui que revient de prouver l'existence du vice caché.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Toute garantie est automatiquement exclue dans le cas d'une dégradation, mauvaise utilisation, négligence ou défaut d'entretien de la part du consommateur, ou dans le cas d'une usure normale du produit.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Dans le cas où le client souhaite faire valoir ses garanties, il est tenu d'informer JACK UP AUTO par écrit de la présence des vices à compter de leur découverte en précisant toutes les informations permettant de connaître l'identité du client, la référence du produit et tout acte réalisé.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les éléments concernés par la garantie sont les pièces détachées et la main d'œuvre fournie par JACK UP AUTO. Le garage garantit au client que tous les travaux et actes de réparation sont effectués conformément aux normes données par le constructeur. La durée de la garantie d'une prestation réalisée est de 365 jours consécutifs à suivre de la date de la prestation indiquée sur la facture, peu importe le nombre de kilométrage ou d'autres facteurs. La garantie comprend, si un défaut ou faute est avéré, la prise en charge des frais de main d'œuvre, les frais de réparation ou d'échange et le remplacement si nécessaire des pièces défectueuses.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Ne sont pas concernés par les garanties les actes de réparation provisoire, conformément à l'acte de réparation provisoire signée par le client. La garantie ne s'applique pas non plus aux travaux d'entretien, de réglage, de mise au point ou de remplacement des pièces d'usure.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Sont également exclus de la garantie :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 font-tech mb-4">
                <li>La prestation a été réalisée par quiconque d'autre que JACK UP AUTO qu'il s'agisse du consommateur lui-même, d'un autre particulier ou d'un professionnel autre.</li>
                <li>Il apparaît que le client n'a pas respecté les préconisations d'utilisation et d'entretien définies dans la notice d'entretien fournie avec le véhicule.</li>
                <li>Il apparaît que le client n'a pas fait effectuer toutes les interventions et actes d'entretien selon le plan d'entretien du livret de bord.</li>
                <li>Ne sont pas concernés par la garantie les frais supplémentaires consécutifs d'un défaut qui n'a pas été signalé dans un laps de temps raisonnable.</li>
                <li>Tout dommage ou frais supplémentaires qui ne rentrent pas dans les critères expressément indiqués dans les présentes mentions légales.</li>
              </ul>
            </div>
          </section>

          {/* Articles du Code de la Consommation */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-futuristic">
              Dispositions légales
            </h3>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Article L211-4 du Code de la Consommation</h4>
                  <p className="text-gray-700 text-sm font-tech">
                    Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant lors de la délivrance. Il répond également des défauts de conformité résultant de l'emballage, des instructions de montage ou de l'installation lorsque celle-ci a été mise à sa charge par le contrat ou a été réalisée sous sa responsabilité.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Article L211-5 du Code de la Consommation</h4>
                  <p className="text-gray-700 text-sm font-tech mb-2">
                    Pour être conforme au contrat, le bien doit :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm font-tech space-y-1">
                    <li>Être propre à l'usage habituellement attendu d'un bien semblable</li>
                    <li>Correspondre à la description donnée par le vendeur</li>
                    <li>Présenter les qualités qu'un acheteur peut légitimement attendre</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Article L211-12 du Code de la Consommation</h4>
                  <p className="text-gray-700 text-sm font-tech">
                    L'action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du bien.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Article 1641 du Code Civil</h4>
                  <p className="text-gray-700 text-sm font-tech">
                    Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage, que l'acheteur ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix, s'il les avait connus.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Article 1648 alinéa 1er du Code Civil</h4>
                  <p className="text-gray-700 text-sm font-tech">
                    L'action résultant des vices rédhibitoires doit être intentée par l'acquéreur dans un délai de deux ans à compter de la découverte du vice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Articles 8-15 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">8</div>
              Responsabilité
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                JACK UP AUTO s'engage auprès du client de réaliser avec professionnalisme et application ses interventions, et également de la bonne qualité des pièces nécessaires et outils utilisés, dans la mesure où ils sont fournis par le garagiste.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                JACK UP AUTO se réserve le droit de refuser le montage et l'utilisation de toute pièce fournie par le client. Seules les pièces neuves fournies par le garage auto sont ainsi garanties. Ainsi aucun cas de garantie ne peut être accordé dès lors que les pièces sont fournies par le client. De plus le garage se réserve le droit d'appliquer des frais de déplacement lorsque l'intervention ne peut aboutir à cause d'une mauvaise référence commandée par le client.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">9</div>
              Lieu d'intervention
            </h2>
            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                JACK UP AUTO se réserve le droit de déterminer si un lieu d'intervention proposé est adéquat ou non. Il est obligatoire pour le client de prévoir une zone dédiée à l'intervention afin de pouvoir dresser un périmètre de sécurité.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le garage auto conseille au client de prévoir une zone d'action au sein d'un garage couvert ou une zone d'action en extérieur permettant de garer le véhicule du réparateur pour les réparations à côté du véhicule à réparer. Dans le cas d'une intervention en extérieur, merci de vous référer à l'article 10 sur les conditions climatiques.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client s'engage à fournir l'adresse exacte correspondant au lieu réel d'intervention et à préciser les caractéristiques et particularités du lieu (parking public ou privé, garage de domicile, etc.).
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client doit impérativement disposer des autorisations ou des droits requis pour procéder aux prestations sur le véhicule.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Lors de l'intervention, le client doit être en mesure de présenter une pièce d'identité ainsi que la carte grise du véhicule sur lequel le réparateur intervient ce jour. En cas d'impossibilité de réaliser la prestation pour des raisons techniques (véhicule difficile d'accès, impossibilité d'intervenir ou absence) JACK UP AUTO se réserve le droit de planifier un nouveau créneau avec le client dans les plus brefs délais.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                La responsabilité de JACK UP AUTO ne saura être engagée en cas de perte, vol ou de détérioration de tout objet laissé dans le véhicule.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">10</div>
              Conditions climatiques
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Des conditions climatiques extrêmes (températures basses, neige, vent ou pluie) peuvent contraindre JACK UP AUTO à ne pas pouvoir effectuer une intervention à l'extérieur ou à l'interrompre. Le garage auto fixera alors un nouveau créneau d'intervention avec le client.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Seul le technicien opérant est en mesure de déterminer si les conditions climatiques lui permettent ou non d'effectuer tout acte technique dans de bonnes conditions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">11</div>
              Prise en charge, intervention et facturation
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Toute intervention de réparation doit être acceptée par le client avant le début de la prestation par l'apposition de sa signature sur l'ordre de réparation. Le présent ordre de réparation signé l'engage sur le paiement des actes réalisés, dont le montant lui est connu.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Lorsque la prestation est terminée, la facture est remise en main propre et/ou envoyée par mail à l'adresse communiquée par le client en même temps que lui sont restituées les clés du véhicule.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Les seuls moyens de paiement acceptés sont ceux prévus par JACK UP AUTO accessibles sur demande et visibles sur le site internet.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                En cas de paiement par carte bancaire, le client garantit qu'il est habilité à son usage et que cette carte bancaire donne accès à des fonds suffisants pour couvrir les coûts de l'intervention prévue en avance et dont le montant est défini sur le devis ou ordre de réparation.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">12</div>
              Conditions de paiement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech">
                Les conditions de paiement sont soumises à accord d'un organisme bancaire dans le cas de règlements en plusieurs mensualités. Par défaut, le paiement complet doit s'effectuer immédiatement à réception de la facture par le client.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">13</div>
              Réserve de propriété
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech">
                Les pièces fournies par JACK UP AUTO, leurs usages et les services fournis sont l'entière propriété de JACK UP AUTO jusqu'au règlement intégral de la prestation par le client.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">14</div>
              Droit de rétractation
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech mb-3">
                Le client bénéficie d'un droit de se rétracter, sans avoir à motiver sa décision, pendant un délai de 14 jours à compter de la date où il a donné son accord, ce jour ne comptant pas.
              </p>
              <p className="text-gray-700 leading-relaxed font-tech">
                Pour exercer son droit de rétractation, le client doit notifier à JACK UP AUTO sa décision de se rétracter par écrit et par courrier par le biais d'une lettre recommandée avec accusé de réception adressée aux coordonnées suivantes : <strong>EURL JACK UP AUTO 23 Rue Louis Blanc 42100 Saint Etienne</strong>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-futuristic">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">15</div>
              Litiges
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed font-tech">
                Dans le cadre d'un litige consécutif à une intervention de JACK UP AUTO, la détermination des responsabilités des parties sera soumise à la compétence des Juges du tribunal de commerce de Saint-Etienne.
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
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-sm text-gray-600 font-tech">
                  <strong>Adresse postale :</strong> EURL JACK UP AUTO, 23 Rue Louis Blanc, 42100 Saint Etienne
                </p>
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